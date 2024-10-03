function Texture(gl) {
    this.gl = gl;
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}

Texture.prototype.bind = function (n, program, name) {
    let gl = this.gl;
    gl.activeTexture([gl.TEXTURE0, gl.TEXTURE1, gl.TEXTURE2][n]);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(gl.getUniformLocation(program, name), n);
};

Texture.prototype.fill = function (width, height, data) {
    let gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.LUMINANCE,
        width,
        height,
        0,
        gl.LUMINANCE,
        gl.UNSIGNED_BYTE,
        data,
    );
};

function WebGLPlayer(canvas, options) {
    this.canvas = canvas;
    this.gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    this.initGL(options);
}

WebGLPlayer.prototype.initGL = function (options) {
    if (!this.gl) {
        console.log("[ER] WebGL not supported.");
        return;
    }

    let gl = this.gl;
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    let program = gl.createProgram();
    let vertexShaderSource = [
        "attribute highp vec4 aVertexPosition;",
        "attribute vec2 aTextureCoord;",
        "varying highp vec2 vTextureCoord;",
        "void main(void) {",
        " gl_Position = aVertexPosition;",
        " vTextureCoord = aTextureCoord;",
        "}",
    ].join("\n");
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    let fragmentShaderSource = [
        "precision highp float;",
        "varying lowp vec2 vTextureCoord;",
        "uniform sampler2D YTexture;",
        "uniform sampler2D UTexture;",
        "uniform sampler2D VTexture;",
        "const mat4 YUV2RGB = mat4",
        "(",
        " 1.1643828125, 0, 1.59602734375, -.87078515625,",
        " 1.1643828125, -.39176171875, -.81296875, .52959375,",
        " 1.1643828125, 2.017234375, 0, -1.081390625,",
        " 0, 0, 0, 1",
        ");",
        "void main(void) {",
        " gl_FragColor = vec4( texture2D(YTexture, vTextureCoord).x, texture2D(UTexture, vTextureCoord).x, texture2D(VTexture, vTextureCoord).x, 1) * YUV2RGB;",
        "}",
    ].join("\n");

    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("[ER] Shader link failed.");
    }
    let vertexPositionAttribute = gl.getAttribLocation(
        program,
        "aVertexPosition",
    );
    gl.enableVertexAttribArray(vertexPositionAttribute);
    let textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
    gl.enableVertexAttribArray(textureCoordAttribute);

    let verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0,
        ]),
        gl.STATIC_DRAW,
    );
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    let texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0]),
        gl.STATIC_DRAW,
    );
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.y = new Texture(gl);
    gl.u = new Texture(gl);
    gl.v = new Texture(gl);
    gl.y.bind(0, program, "YTexture");
    gl.u.bind(1, program, "UTexture");
    gl.v.bind(2, program, "VTexture");
};

WebGLPlayer.prototype.renderFrame = function (videoFrame, width, height, rect) {
    if (!this.gl) {
        console.log("[ER] Render frame failed due to WebGL not supported.");
        return;
    }
    let uOffset = width * height;
    let vOffset = (width / 2) * (height / 2);
    let gl = this.gl;
    // this.resize(gl.canvas);
    gl.enable(gl.SCISSOR_TEST);
    gl.viewport(rect.left, rect.bottom, rect.width, rect.height);
    gl.scissor(rect.left, rect.bottom, rect.width, rect.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.y.fill(width, height, videoFrame.subarray(0, uOffset));
    gl.u.fill(
        width >> 1,
        height >> 1,
        videoFrame.subarray(uOffset, uOffset + vOffset),
    );
    gl.v.fill(
        width >> 1,
        height >> 1,
        videoFrame.subarray(uOffset + vOffset, videoFrame.length),
    );

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

WebGLPlayer.prototype.fullscreen = function () {
    let canvas = this.canvas;
    if (canvas.RequestFullScreen) {
        canvas.RequestFullScreen();
    } else if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
    } else {
        alert("This browser doesn't supporter fullscreen");
    }
};

WebGLPlayer.prototype.exitfullscreen = function () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else {
        alert("Exit fullscreen doesn't work");
    }
};

WebGLPlayer.prototype.resize = function (canvas) {
    let displayWidth = canvas.clientWidth;
    let displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
};

class RenderWorker {
    constructor(options) {
        this.logger = new Logger("Render", options.isDebug);
        this.canvas = options.canvas;
        this.interval = options.interval;
        this.gridLayout = options.gridLayout;
        this.webgl = new WebGLPlayer(this.canvas, {
            preserveDrawingBuffer: false,
        });
        this.frames = [];
        this.offsetTs = 0;
        this.isLoop = true;
        this.animation = requestAnimationFrame(this.renderLoop.bind(this));
    }

    renderLoop(time) {
        if (!this.offsetTs) {
            this.offsetTs = time;
        }
        if (time - this.offsetTs >= this.interval) {
            this.frames.forEach((frame, index) => {
                if (frame && this.gridLayout[index]) {
                    this.webgl.renderFrame(
                        frame.d,
                        frame.w,
                        frame.h,
                        this.gridLayout[index],
                    );
                }
            });
            this.offsetTs = time;
        }
        if (this.isLoop) {
            requestAnimationFrame(this.renderLoop.bind(this));
        }
    }

    clearFrameData(i) {
        this.frames[i] = null;
    }

    stop() {
        this.frames = [];
        this.isLoop = false;
    }

    addFrame(frame) {
        this.frames[frame.i] = frame;
    }

    updateGridLayout(gridLayout) {
        cancelAnimationFrame(this.animation);
        this.gridLayout = gridLayout;
        this.animation = requestAnimationFrame(this.renderLoop.bind(this));
    }

    fullscreen() {
        if (this.webgl) {
            this.webgl.fullscreen();
        }
    }

    exitfullscreen() {
        if (this.webgl) {
            this.webgl.exitfullscreen();
        }
    }
}

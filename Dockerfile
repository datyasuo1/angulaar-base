FROM --platform=linux/amd64 node:20-alpine As builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# RUN npm --registry http://10.254.144.164:8081/repository/npm-registry/ install

RUN npm install --force

COPY . . 

RUN npm run build --prod

FROM --platform=linux/amd64 nginx:1.25.2

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist/ioc/ /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
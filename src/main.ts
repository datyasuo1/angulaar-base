import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const DEBUG = !environment.production;
if (!DEBUG) {
    if (!window.console) window.console = {} as Console;
    const methods = ['log', 'debug', 'warn', 'info', 'error'];
    for (let i = 0; i < methods.length; i++) {
        (console as any)[methods[i]] = function () {};
    }
}

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));

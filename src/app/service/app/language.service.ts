import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    constructor(public translate: TranslateService) {}

    t(word: string) {
        return this.translate.instant(word);
    }
}

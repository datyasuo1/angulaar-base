import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../service/common';

@Pipe({
    name: 'objToLink',
})
export class ObjToLinkPipe implements PipeTransform {
    transform(obj: Image, arg: string) {
        if (typeof obj === 'string') obj = JSON.parse(obj);
        if (obj && Object.keys(obj).length > 0) return arg + obj.path;
        else return '';
    }
}

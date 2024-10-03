import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataValidator',
})
export class DataValidatorPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        if (value == null || value == undefined || value == '') return '-';
        return value;
    }
}

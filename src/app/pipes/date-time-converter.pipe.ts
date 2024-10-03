import { Pipe, PipeTransform } from '@angular/core';
import {
    convertToDateFormat,
    convertToDateTimeFormat,
    convertToTimeFormat,
    timeFromNow,
} from 'src/app/utils/datetime';

@Pipe({
    name: 'dateTimeConverter',
})
export class DateTimeConverterPipe implements PipeTransform {
    transform(value: string, arg?: string) {
        if (!value) return '';
        switch (arg) {
            case 'DATE':
                return convertToDateFormat(value);
            case 'TIME':
                return convertToTimeFormat(value);
            case 'DATE_TIME':
                return convertToDateTimeFormat(value);
            case 'FROM_NOW':
                return timeFromNow(value);
        }
        return value;
    }
}

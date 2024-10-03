import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { DateTimeConverterPipe } from 'src/app/pipes/date-time-converter.pipe';
import { ObjToLinkPipe } from 'src/app/pipes/obj-to-link.pipe';
import { TaskTypePipe } from 'src/app/pipes/task-type.pipe';
import { DataValidatorPipe } from 'src/app/pipes/data-validator.pipe';

@NgModule({
    declarations: [
        SafePipe,
        DateTimeConverterPipe,
        ObjToLinkPipe,
        TaskTypePipe,
        DataValidatorPipe,
    ],
    imports: [CommonModule],
    exports: [
        SafePipe,
        DateTimeConverterPipe,
        ObjToLinkPipe,
        TaskTypePipe,
        DataValidatorPipe,
    ],
})
export class SharedModule {}

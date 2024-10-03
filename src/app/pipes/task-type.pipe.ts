import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'taskType',
})
export class TaskTypePipe implements PipeTransform {
    transform(taskParentId: string): unknown {
        return taskParentId ? 'Công việc con' : 'Công việc';
    }
}

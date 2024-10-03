import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskFilterService {
    constructor() {}
    private taskGroupFilter$: BehaviorSubject<number> = new BehaviorSubject(0);

    get currentTaskGroupFilter() {
        return this.taskGroupFilter$.value;
    }
    getTaskGroupFilter() {
        return this.taskGroupFilter$.asObservable();
    }

    setTaskGroupFilter(value: number) {
        this.taskGroupFilter$.next(value);
    }
}

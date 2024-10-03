import { Component, Injector, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ToastService } from './service/app/toast.service';
import { BaseApiResponse } from './interface/common.interface';
import { ConfirmationService } from 'primeng/api';
import { RESPONSE_STATUS } from './shared/AppEnum';
import { FormControl } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiHandlerService } from './service/app/api-handler.service';

@Component({
    template: '',
})
export abstract class AppComponentBase implements OnDestroy {
    destroy$ = new Subject<void>();
    isLoading: boolean = false;
    toastService: ToastService;
    currentPage: number = 1;
    first: number = 0;
    rows: number = 10;
    totalRecord: number = 0;
    confirmationService: ConfirmationService;
    dialogService: DialogService;
    apiHandlerService: ApiHandlerService;

    constructor(injector: Injector) {
        this.toastService = injector.get(ToastService);
        this.confirmationService = injector.get(ConfirmationService);
        this.dialogService = injector.get(DialogService);
        this.apiHandlerService = injector.get(ApiHandlerService);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openDialog(title: string, component, dialogConfig?: any) {
        return this.dialogService.open(component, {
            header: title,
            width: '35vw',
            data: dialogConfig,
            modal: true,
            draggable: true,
        });
    }

    getControl(formControl: FormControl, controlName: string): FormControl {
        return formControl.get(controlName) as FormControl;
    }

    getErrorMsg(formControl: FormControl, controlName: string) {
        const control = formControl.get(controlName) as FormControl;

        if (!control) {
            return '';
        }

        return control?.errors
            ? control?.errors[Object.keys(control?.errors)[0]].message
            : '';
    }
}

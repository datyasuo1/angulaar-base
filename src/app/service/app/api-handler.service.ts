import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class ApiHandlerService {
    constructor(private toastService: ToastService) {}

    handleSuccess(
        response: CommonResponse,
        callBack: () => void = () => {},
        callBackType: number = -1,
    ) {
        const codes = [200, 201];
        if (codes.includes(response?.code)) {
            this.toastService.showSuccess('Thành công!', response?.message);
            if (callBackType == response?.code) callBack();
        }

        if (callBackType == -1) callBack();
    }
    handleError(
        error: any,
        callBack: () => void = () => {},
        callBackType: number = -1,
    ) {
        const err = error.error;
        const codes = [400, 401, 403, 500];
        if (codes.includes(err.code)) {
            this.toastService.showError('Thất bại!', err.message);
            if (callBackType == err.code) callBack();
        } else {
            this.toastService.showError(
                'Thất bại!',
                'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.',
            );
        }

        if (callBackType == -1) callBack();
    }
}

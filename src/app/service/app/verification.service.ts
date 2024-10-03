import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class VerificationService {
    constructor(private confirmService: ConfirmationService) {}

    delVerification(message: string, accept: () => void) {
        this.confirmService.confirm({
            message,
            header: 'Xác nhận',
            icon: 'ti ti-alert-triangle',
            acceptLabel: 'Xoá',
            rejectLabel: 'Huỷ',
            acceptButtonStyleClass: 'danger',
            accept,
        });
    }

    saveVerification(accept: () => void) {
        this.confirmService.confirm({
            message:
                'Các thay đổi vẫn chưa được lưu, bạn có chắc chắn muốn thoát?',
            header: 'Xác nhận',
            icon: 'ti ti-info-circle',
            acceptLabel: 'Thoát',
            rejectLabel: 'Huỷ',
            accept: accept,
        });
    }
}

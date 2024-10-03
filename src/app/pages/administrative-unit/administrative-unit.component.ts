import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { AuTreeSelectComponent } from 'src/app/components/common/au-tree-select/au-tree-select.component';
import {
    AdministrativeUnit,
    AdministrativeUnitService,
    AdministrativeUnitsResponse,
    AdministrativeUnitTree,
    Level,
    LevelsResponse,
} from 'src/app/service/api/administrative-unit.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-administrative-unit',
    templateUrl: './administrative-unit.component.html',
    styleUrls: ['./administrative-unit.component.scss'],
})
export class AdministrativeUnitComponent extends TableBaseComponent {
    constructor(
        private administrativeUnitService: AdministrativeUnitService,
        private apiHandlerService: ApiHandlerService,
        private verificationService: VerificationService,
    ) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.getAULevels();
    }

    @ViewChild('au') aTS: AuTreeSelectComponent;

    searchText: string = '';

    administrativeUnit: AdministrativeUnitTree;

    showDialog: boolean = false;

    dialogTitle: string = '';

    dialogLoading: boolean = false;

    auName: string = '';

    errorAuName: string = '';

    levels: Level[] = [];

    selectedLevel: Level = null;

    ts: AdministrativeUnit[] = [];

    selectedT: AdministrativeUnit;

    currentId: string = '';

    errorT: string = '';

    errorLevel: string = '';

    oldUnitId: string = '';

    handleTChange(data: AdministrativeUnit) {
        this.selectedT = data;
        this.errorT = '';
    }

    handleLevelChange(data: Level) {
        this.selectedLevel = data;
        this.errorLevel = '';
        this.administrativeUnitService
            .getComboBoxAdministrativeUnits(this.selectedLevel.id.toString())
            .subscribe({
                next: (res: AdministrativeUnitsResponse) => {
                    this.ts = res.data;
                },
            });
    }

    handleAuNameChange(data: string) {
        this.auName = data;
        this.errorAuName = '';
    }

    getAULevels() {
        this.administrativeUnitService.getAULevels().subscribe({
            next: (res: LevelsResponse) => {
                this.levels = res.data;
            },
        });
    }

    resetDialog() {
        this.selectedLevel = null;
        this.selectedT = null;
        this.errorAuName = '';
        this.auName = '';
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.auName)) {
            this.errorAuName = 'Vui lòng nhập tên đơn vị hành chính';
            res = false;
        }
        if (!validator.isObjectInputValid(this.selectedLevel)) {
            this.errorLevel = 'Vui lòng chọn cấp';
            res = false;
        }
        if (!validator.isObjectInputValid(this.selectedT)) {
            this.errorT = 'Vui lòng chọn trực thuộc';
            res = false;
        }
        return res;
    }

    handleDialogButtonClick() {
        if (
            this.dialogTitle == 'Thêm mới đơn vị hành chính' &&
            this.validateForm()
        ) {
            this.dialogLoading = true;
            this.administrativeUnitService
                .addAU({
                    name: this.auName,
                    unitId: this.selectedLevel.id,
                    parentId: this.selectedT.code,
                })
                .pipe(
                    finalize(() => {
                        this.dialogLoading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.showDialog = false;
                                this.getTableData();
                            },
                            201,
                        );
                    },
                });
        }

        if (
            this.dialogTitle == 'Cập nhật đơn vị hành chính' &&
            this.validateForm()
        ) {
            this.dialogLoading = true;
            this.administrativeUnitService
                .updateAU(
                    {
                        name: this.auName,
                        newUnitId: this.selectedLevel.id,
                        oldUnitId: parseInt(this.oldUnitId),
                        parentId: this.selectedT.code,
                    },
                    this.currentId,
                )
                .pipe(
                    finalize(() => {
                        this.dialogLoading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.showDialog = false;
                                this.getTableData();
                            },
                            200,
                        );
                    },
                });
        }
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleAUChange(value: AdministrativeUnitTree) {
        this.administrativeUnit = value;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    override getTableData() {
        this.loading = true;
        const selectedPlace = this.administrativeUnit;

        const { wardCode, districtCode, provinceCode } = selectedPlace ?? {};

        const place = `${wardCode ?? ''},${districtCode ?? ''},${
            provinceCode ?? ''
        }`;

        this.administrativeUnitService
            .getAdministrativeUnits(
                '',
                this.currentPage,
                this.rows,
                this.searchText,
                place,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: AdministrativeUnitsResponse) => {
                    const { data, totalElement } = res ?? {};
                    this.data = data;
                    this.totalRecords = totalElement;
                },
            });
    }

    handleAddAU() {
        this.showDialog = true;
        this.dialogTitle = 'Thêm mới đơn vị hành chính';
    }

    handleUpdateAU(data: AdministrativeUnit) {
        this.dialogTitle = 'Cập nhật đơn vị hành chính';
        this.selectedLevel = this.levels.find(
            (x: Level) => x.id === data.levelId,
        );
        this.auName = data.name;
        this.administrativeUnitService
            .getComboBoxAdministrativeUnits(this.selectedLevel?.id.toString())
            .subscribe({
                next: (res: AdministrativeUnitsResponse) => {
                    this.ts = res.data;
                    this.selectedT = this.ts.find(
                        (x) => x.code == data.parentId,
                    );
                    this.showDialog = true;
                },
            });

        this.currentId = data.code;
        this.oldUnitId = data.levelId.toString();
    }

    handleDeleteAU(id: string, levelId: number) {
        this.administrativeUnitService.deleteAU(id, levelId).subscribe({
            next: (res: CommonResponse) => {
                this.apiHandlerService.handleSuccess(
                    res,
                    () => {
                        this.getTableData();
                        this.aTS.getAUs();
                    },
                    200,
                );
            },
        });
    }

    handleConfirmDelete(data: AdministrativeUnit) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá đơn vị hành chính <strong>${data.name}</strong>?`,
            () => {
                this.handleDeleteAU(data.code, data.levelId);
            },
        );
    }
}

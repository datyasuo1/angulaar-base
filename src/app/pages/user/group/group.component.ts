import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { AssignableService } from 'src/app/service/api/assignable.service';
import {
    UserGroup,
    UserGroupService,
    UserGroupsResponse,
} from 'src/app/service/api/user-group.service';
import {
    GroupOfUser,
    GroupOfUsersResponse,
    User,
    UserResponse,
    UserService,
} from 'src/app/service/api/user.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrl: './group.component.scss',
})
export class GroupComponent extends TableBaseComponent {
    constructor(
        private userService: UserService,
        private apiHandlerService: ApiHandlerService,
        private verificationService: VerificationService,
        private userGroupService: UserGroupService,
        private assignableService: AssignableService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
    }

    override ngOnInit(): void {
        this.userId = parseInt(decryptLong(this.route.snapshot.params?.['id']));
        this.getUserById();
        super.ngOnInit();
    }

    @Input() viewOnly: boolean = false;

    userData: User;

    userId: number;

    userGroups: UserGroup[] = [];

    selectedGroups: UserGroup[] = [];

    errorSelectedGroups: string = '';

    showDialog: boolean = false;

    dialogTitle: string = '';

    dialogLoading: boolean = false;

    groupIds: number[];

    override getTableData() {
        this.loading = true;
        this.userService
            .getGroupsOfUser(
                this.userId.toString(),
                this.currentPage,
                this.rows,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: any) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
        this.userService
            .getGroupsOfUser(this.userId.toString(), -1, 1)
            .subscribe({
                next: (res: any) => {
                    this.groupIds = res.data.map((item: any) => {
                        return item.groupId;
                    });
                },
            });
    }

    getUserById() {
        this.userService.getUserById(this.userId.toString()).subscribe({
            next: (data: UserResponse) => {
                this.userData = data?.data;
                this.callGetUserGroupAPI();
            },
        });
    }

    handleAddToGroup() {
        this.showDialog = true;
        this.selectedGroups = this.userGroups.filter((item: UserGroup) =>
            this.groupIds.includes(item.id),
        );
    }

    resetDialog() {
        this.selectedGroups = [];
        this.errorSelectedGroups = '';
    }

    handleConfirmDelete(data: GroupOfUser) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá người dùng khỏi nhóm <strong>${data.name}</strong>?`,
            () => {
                this.handleDeleteGroup(data.groupId?.toString());
            },
        );
    }

    handleDeleteGroup(groupId: string) {
        this.userService
            .deleteGroupOfUser(this.userId.toString(), groupId)
            .subscribe({
                next: (res: CommonResponse) => {
                    this.apiHandlerService.handleSuccess(
                        res,
                        () => {
                            this.getTableData();
                        },
                        200,
                    );
                },
            });
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();

        if (!validator.isObjectInputValid(this.selectedGroups)) {
            res = false;
            this.errorSelectedGroups = 'Vui lòng chọn nhóm người dùng!';
        }
        return res;
    }

    handleDialogButtonClick() {
        if (this.validateForm()) {
            this.dialogLoading = true;
            const data = {
                userId: this.userId,
                groupIds: this.selectedGroups.map(
                    (group: UserGroup) => group.id,
                ),
            };
            this.assignableService
                .assignUserToGroups(data)
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
    }

    callGetUserGroupAPI() {
        this.userGroupService
            .getComboBoxUserGroups(
                -1,
                1,
                '',
                '',
                this.userData?.agencyId?.toString(),
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: UserGroupsResponse) => {
                    this.userGroups = res.data;
                },
            });
    }

    handleSelectedGroupsChange(data: UserGroup[]) {
        this.selectedGroups = data;
        this.errorSelectedGroups = '';
    }

    handleClose() {
        this.router.navigate(['user-permission', 'user']);
    }
}

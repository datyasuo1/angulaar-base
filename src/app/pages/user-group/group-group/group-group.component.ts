import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { HeaderSchema } from 'src/app/components/core/lazy-table/lazy-table.component';
import { AssignableService } from 'src/app/service/api/assignable.service';
import { UserGroupService } from 'src/app/service/api/user-group.service';
import {
    User,
    UserService,
    UsersResponse,
} from 'src/app/service/api/user.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-group-group',
    templateUrl: './group-group.component.html',
    styleUrl: './group-group.component.scss',
})
export class GroupGroupComponent extends TableBaseComponent {
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
        this.setTableHeaderSchema();
        this.userGroupId = parseInt(
            decryptLong(this.route.snapshot.params?.['id']),
        );
        this.getUserGroupById();
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['viewOnly']) {
            this.setTableHeaderSchema();
        }
    }

    @Input() viewOnly: boolean = false;

    userGroupId: number;

    users: User[] = [];

    selectedUsers: User[] = [];

    errorSelectedUsers: string = '';

    showDialog: boolean = false;

    dialogTitle: string = '';

    dialogLoading: boolean = false;

    userIds: number[];

    tableHeaderSchema: HeaderSchema[] = [];

    userGroupData: any;

    setTableHeaderSchema() {
        this.tableHeaderSchema = [
            {
                label: 'STT',
                minWidth: '3rem',
                align: 'center',
            },
            {
                label: 'Tên đăng nhập',
            },
            {
                label: 'Họ và tên',
            },

            {
                label: 'Số điện thoại',
            },
            {
                label: 'Email',
            },

            {
                label: 'Trạng thái',
            },
            {
                label: 'Thao tác',
                align: 'center',
                show: !this.viewOnly,
            },
        ];
    }

    override getTableData() {
        this.loading = true;
        this.userGroupService
            .getUsersOfGroup(
                this.userGroupId.toString(),
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
        this.userGroupService
            .getUsersOfGroup(this.userGroupId.toString(), -1, 1)
            .subscribe({
                next: (res: any) => {
                    this.userIds = res.data.map((item: any) => {
                        return item.userId;
                    });
                },
            });
    }

    getUserGroupById() {
        this.userGroupService
            .getUserGroupById(this.userGroupId.toString())
            .subscribe({
                next: (data: any) => {
                    this.userGroupData = data?.data;
                    this.getUsers();
                },
            });
    }

    handleAddToGroup() {
        this.showDialog = true;
        this.selectedUsers = this.users.filter((item: User) =>
            this.userIds.includes(item.id),
        );
    }

    resetDialog() {
        this.selectedUsers = [];
        this.errorSelectedUsers = '';
    }

    handleConfirmDelete(data: any) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá người dùng <strong>${data.username}</strong> khỏi nhóm ?`,
            () => {
                this.handleDeleteGroup(data.userId?.toString());
            },
        );
    }

    handleDeleteGroup(userId: string) {
        this.userService
            .deleteUserOfGroup(userId, this.userGroupId.toString())
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

        if (!validator.isObjectInputValid(this.selectedUsers)) {
            res = false;
            this.errorSelectedUsers = 'Vui lòng chọn nhóm người dùng!';
        }
        return res;
    }

    handleDialogButtonClick() {
        if (this.validateForm()) {
            this.dialogLoading = true;
            const data = {
                groupId: this.userGroupId,
                userIds: this.selectedUsers.map((user: User) => user.id),
            };
            this.assignableService
                .assignGroupToUsers(data)
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

    getUsers() {
        this.userService
            .getComboBoxUsers(-1, 1, '', '', this.userGroupData.agencyId)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: UsersResponse) => {
                    this.users = res.data;
                },
            });
    }

    handleSelectedUsersChange(data: User[]) {
        this.selectedUsers = data;
        this.errorSelectedUsers = '';
    }

    handleClose() {
        this.router.navigate(['user-permission', 'user-group']);
    }
}

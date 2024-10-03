import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import {
    UserLogsResponse,
    UserResponse,
    UserService,
} from 'src/app/service/api/user.service';
import { decryptLong } from 'src/app/utils/encrypt';
@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrl: './history.component.scss',
})
export class HistoryComponent extends TableBaseComponent {
    id: string;

    ssoId: string;

    title: string = 'Lịch sử đăng nhập của tài khoản';

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        super();
    }

    override ngOnInit() {
        this.id = decryptLong(this.activatedRoute.snapshot.params['id']);

        this.userService.getUserById(this.id).subscribe({
            next: (res: UserResponse) => {
                this.ssoId = res?.data?.ssoId;
                this.title =
                    'Lịch sử đăng nhập của tài khoản ' + res?.data?.username;
                super.ngOnInit();
            },
        });
    }

    override getTableData() {
        this.loading = true;
        this.userService
            .getUserLog(this.ssoId, this.currentPage, this.rows)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: UserLogsResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }

    handleClose() {
        this.router.navigate(['user-permission', 'user']);
    }
}

import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IGetServerPayload,
    IServerManagement,
} from 'src/app/interface/system-management/server-management.interface';
import { ServerManagementService } from 'src/app/service/api/server-management.service';
import { VerificationService } from '../../../service/app/verification.service';

@Component({
    selector: 'app-list-server',
    templateUrl: './list-server.component.html',
    styleUrl: './list-server.component.scss',
})
export class ListServerComponent extends AppComponentBase implements OnInit {
    listServer: IServerManagement[] = [];
    searchParams = {
        name: '',
        ipAddress: '',
        monitorLink: '',
    };
    constructor(
        injector: Injector,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly serverManagementService: ServerManagementService,
        private readonly verificationService: VerificationService,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.callServerList();
    }

    private callServerList() {
        this.isLoading = true;
        const payload = {
            page: this.currentPage,
            size: this.rows,
            name: this.searchParams.name,
            monitorLink: this.searchParams.monitorLink,
            ipAddress: this.searchParams.ipAddress,
        } as IGetServerPayload;

        this.serverManagementService
            .getServerList(payload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                this.listServer = rs.data;
                this.totalRecord = rs.totalElement;
            });
    }

    handleAddServer() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    handleUpdateServer(server: IServerManagement) {
        this.router.navigate(['update'], {
            relativeTo: this.route,
            queryParams: {
                id: server.id,
            },
        });
    }

    handleRemoveServer(server: IServerManagement) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa thông tin máy chủ <strong>${server.name}</strong>?`,
            () => {
                this.serverManagementService
                    .removeServer(server.id)
                    .subscribe((rs) => {
                        this.apiHandlerService.handleSuccess(
                            rs,
                            () => {
                                this.callServerList();
                            },
                            200,
                        );
                    });
            },
        );
    }

    loadTable(event: any) {
        this.rows = event.rows;
        this.first = event.first;
        this.currentPage = event.currentPage;
        this.callServerList();
    }

    getTagSeverity(statusId: number) {
        switch (statusId) {
            case 1:
                return 'success';
            case 2:
                return 'secondary';
            default:
                return 'secondary';
        }
    }

    handleSearch(data: string, field: string) {
        this.searchParams[field] = data;
        this.currentPage = 1;
        this.first = 0;
        this.callServerList();
    }
}

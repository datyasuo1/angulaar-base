import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IDeployedSystem,
    IGetDeployedSystemPayload,
} from 'src/app/interface/system-management/deployed-system-management.interface';
import { DeployedSystemService } from 'src/app/service/api/deployed-system.service';
import { VerificationService } from 'src/app/service/app/verification.service';

@Component({
    selector: 'app-list-deployed-system',
    templateUrl: './list-deployed-system.component.html',
    styleUrl: './list-deployed-system.component.scss',
})
export class ListDeployedSystemComponent
    extends AppComponentBase
    implements OnInit
{
    listSystem: IDeployedSystem[] = [];
    searchParams = {
        name: '',
        domain: '',
        ipAddress: '',
        monitorAppLink: '',
    };
    constructor(
        injector: Injector,
        private readonly deployedSystemService: DeployedSystemService,
        private readonly verificationService: VerificationService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.callListSystem();
    }

    callListSystem() {
        this.isLoading = true;
        const payload = {
            page: this.currentPage,
            size: this.rows,
            name: this.searchParams.name,
            domain: this.searchParams.domain,
            ipAddress: this.searchParams.ipAddress,
            monitorAppLink: this.searchParams.monitorAppLink,
        } as IGetDeployedSystemPayload;

        this.deployedSystemService
            .getListSystem(payload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                this.listSystem = rs.data;
                this.totalRecord = rs.totalElement;
            });
    }

    loadTable(event: any) {
        this.rows = event.rows;
        this.first = event.first;
        this.currentPage = event.currentPage;
        this.callListSystem();
    }

    handleAddSystem() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    handleUpdateSystem(system: IDeployedSystem) {
        this.router.navigate(['update'], {
            relativeTo: this.route,
            queryParams: {
                id: system.id,
            },
        });
    }

    handleRemoveSystem(system: IDeployedSystem) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa máy chủ phần mềm triển khai <strong>${system.name}</strong>?`,
            () => {
                this.deployedSystemService
                    .removeSystem(system.id)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((rs) => {
                        this.apiHandlerService.handleSuccess(
                            rs,
                            () => {
                                this.callListSystem();
                            },
                            200,
                        );
                    });
            },
        );
    }

    handleSearch(data: string, field: string) {
        this.searchParams[field] = data;
        this.currentPage = 1;
        this.first = 0;
        this.callListSystem();
    }
}

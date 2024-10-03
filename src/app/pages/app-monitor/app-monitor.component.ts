import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IDeployedSystem,
    IGetDeployedSystemPayload,
} from 'src/app/interface/system-management/deployed-system-management.interface';
import { DeployedSystemService } from 'src/app/service/api/deployed-system.service';

@Component({
    selector: 'app-app-monitor',
    templateUrl: './app-monitor.component.html',
    styleUrl: './app-monitor.component.scss',
})
export class AppMonitorComponent extends AppComponentBase {
    constructor(
        injector: Injector,
        private deployedSystemService: DeployedSystemService,
    ) {
        super(injector);
    }

    listSystem: IDeployedSystem[] = [];
    searchParams = {
        name: '',
        domain: '',
        ipAddress: '',
        monitorAppLink: '',
    };

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

    handleSearch(data: string, field: string) {
        this.searchParams[field] = data;
        this.currentPage = 1;
        this.first = 0;
        this.callListSystem();
    }

    viewMonitorLink(link: string) {
        window.open(link, '_blank');
    }
}

import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, of, switchMap, filter } from 'rxjs';
import { ImageService } from 'src/app/service/api/image.service';
import { ApplicationService } from 'src/app/service/api/application.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { ToastService } from 'src/app/service/app/toast.service';
import { AppAccessHistoryService } from '../../../service/api/app-access-history.service';
import { ICreateAppAccessLogPayload } from 'src/app/interface/account/app-access-history';
@Component({
    selector: 'app-list-app',
    templateUrl: './list-app.component.html',
    styleUrls: ['./list-app.component.scss'],
})
export class ListAppComponent {
    constructor(
        private applicationService: ApplicationService,
        private toastService: ToastService,
        private router: Router,
        private appAccessHistoryService: AppAccessHistoryService,
    ) {}

    ngOnInit() {
        this.getSpecificGroup();
    }

    createLog(app) {
        const payload = {
            appId: app.id,
            systemCode: 'WEB',
        } as ICreateAppAccessLogPayload;
        this.appAccessHistoryService.createAppAccessLog(payload).subscribe();
    }

    showToastInfo(item: any) {
        this.visibleInfo = true;
        this.selectedApp = item;

        if (this.selectedApp.webVersions.length > 1) {
            this.selectedApp.webVersions = this.selectedApp.webVersions.filter(
                (x) => x.isNowVersion == false,
            );
        }
    }
    navigate(item: any) {
        const currentVer = item.webVersions.find(
            (x) => x.isNowVersion && x.isWebVersion,
        );
        const params = JSON.parse(currentVer.parameters) || [];
        let url = item.url;

        params.forEach((param) => {
            const value = localStorage.getItem(param);
            if (value) {
                url += `?${param}=${value}`;
            }
        });

        if (item.statusName == 'Đang phát triển') {
            this.toastService.showInfo(
                'Thông báo',
                'Ứng dụng đang phát triển',
                5000,
            );
        } else if (item.statusName == 'Đang hoạt động') {
            if (item.categoryName == 'External') {
                window.open(url, '_blank');
            } else if (item.categoryName == 'Internal') {
                this.router.navigateByUrl(url);
            }
        }
    }
    getSpecificGroup() {
        this.loading = true;
        this.applicationService
            .getSpecificGroupApplications(
                this.page,
                this.size,
                this.isWebVersion,
                this.groupId,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: any) => {
                    this.listApplications = res.data;
                    this.totalRecords = res?.totalElement;
                },
            });
    }

    @Input() show: boolean = false;

    @Input() groupId: string = '';

    @Input() groupName: string = '';

    @Output() onDone = new EventEmitter<boolean>();

    @Input() dialogTitle: string = '';

    @Input() dialogButtonText: string = '';

    @Input() dialogData: any = {};

    dialogLoading = false;

    visibleInfo = false;

    selectedApp: any;

    listApplications: any[] = [];

    value: number | null = null;

    loading: boolean = false;

    errorValue = '';

    totalRecords: number;

    page: number = 1;

    size: number = 4;

    errorPriorityName: string = '';

    priorityName: string = '';

    file: File | undefined = undefined;

    filename: string = '';

    icon: any = {};

    color: string = '';

    errorColor: string = '';

    errorFile: string = '';

    rows: number = 4;

    first: number = 0;

    isWebVersion: boolean = true;

    handlePageChange(event: any) {
        this.page = Math.ceil(event.first / event.rows) + 1;
        this.size = event.rows;
        this.getSpecificGroup();
    }

    getPath(item) {
        return item.imageHost + item.attachFileWeb.path;
    }
}

import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ChatService } from 'src/app/service/api/chat.service';
import { DepartmentTree } from 'src/app/service/api/department.service';
import {
    Field,
    FieldResponse,
    FieldService,
} from 'src/app/service/api/field.service';
import {
    PrioritiesResponse,
    Priority,
    PriorityService,
} from 'src/app/service/api/priority.service';
import { ServiceService } from 'src/app/service/api/service.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { exportExcel } from 'src/app/utils/export-file';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ServiceComponent {
    constructor(
        private confirmationService: ConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private priorityService: PriorityService,
        private serviceService: ServiceService,
        private userInfoService: UserInfoService,
        private chatService: ChatService,
        private fieldService: FieldService,
        private cdr: ChangeDetectorRef,
    ) {}

    screenBuilderURL: string = environment.screenBuilderURL || '';

    rangeDates: Date[] | undefined;

    contentTitle: string = '';

    statusProcessList: any[];

    selectedStatusProcess: any;

    levelList: Priority[];

    selectedLevel: Priority;

    department: DepartmentTree;

    warningList: any[] = [];

    selectedWarning: any;

    first: number = 0;

    rows: number = 10;

    currentPage: number = 1;

    totalRecords: number = 0;

    loading: boolean = false;

    tagTotalElement: number = 0;

    accessToken: string = localStorage.getItem('accessToken') || '';

    screenRendererInput: any;

    filterVisible: boolean = false;

    appId = '';

    serviceList: any[] = [];

    showDialog: boolean = false;

    chatURL: string = environment.appChatURL;

    chatToken: string = '';

    discussName: string = '';

    roomStatus: number;

    fieldInfo: Field;

    ngOnInit(): void {
        const { id } = this.userInfoService.getUserInfo();
        this.route.params.subscribe(() => {
            this.selectedStatusProcess = {};
            this.department = undefined;
            this.contentTitle = '';

            this.rangeDates = [
                new Date(Date.now() - 30 * 86400 * 1000),
                new Date(Date.now()),
            ];

            this.screenRendererInput = {
                id: '',
                accessToken: this.accessToken,
                userId: id,
            };

            this.callWarningList();
            this.getStatusProcess();
            this.getPriorities();
            this.getFieldById();
        });

        this.chatService
            .loginChat({
                serviceName: 'keycloak',
                accessToken: this.accessToken,
                expiresIn: 200,
            })
            .subscribe({
                next: (res: any) => {
                    this.chatToken = res?.data?.authToken;
                },
            });

        this.serviceList = this.userInfoService
            .getUserInfo()
            ?.iocMenus.find((item: any) => item.label == 'Dịch vụ').items;
    }

    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
    }

    getFieldById() {
        const id = this.route.snapshot.params?.['serId'] || '';
        this.fieldService.getFieldById(id).subscribe({
            next: (res: FieldResponse) => {
                this.fieldInfo = res.data;
            },
        });
    }

    handleClearFilter() {
        this.selectedLevel = {
            id: undefined,
            name: '-- Tất cả --',
        };
        this.rangeDates = [
            new Date(Date.now() - 30 * 86400 * 1000),
            new Date(Date.now()),
        ];
        this.department = undefined;
        this.callWarningList();
        this.getStatusProcess();
    }

    handleFilter() {
        this.currentPage = 1;
        this.first = 0;
        this.callWarningList();
        this.getStatusProcess();
    }

    changeLabelStatusProcess(data: any[]) {
        data.forEach((item: any) => {
            if (item.id == undefined) {
                let s = 0;
                data.forEach((i: any) => {
                    if (i.count && typeof i.count == 'number') s += i.count;
                });
                item.status = item.status + ' (' + s + ')';
            } else {
                item.status = item.status + ' (' + item.count + ')';
                // Stop show for children
                // if (item.children && item.children.length > 0) {
                //     this.changeLabelStatusProcess(item.children);
                // }
            }
        });
    }

    getStatusProcess() {
        this.statusProcessList = [
            {
                id: undefined,
                status: '-- Tất cả --',
                chosen: true,
            },
        ];
        const priorityId = this.selectedLevel?.id?.toString() ?? '';
        const processingUnit = this.department?.id?.toString() ?? '';
        const createdAt =
            this.rangeDates
                ?.map((item) => {
                    return this.getOutputDateString(new Date(item));
                })
                .join(',') || '';
        const id = this.route.snapshot.params?.['serId'] || '';
        const filterStr = this.getAPIFilter(
            id,
            this.contentTitle,
            priorityId,
            createdAt,
            processingUnit,
            undefined,
            true,
        );
        this.serviceService.getStatusProcess(filterStr).subscribe({
            next: (res: any) => {
                this.statusProcessList = [
                    ...this.statusProcessList,
                    ...res.data,
                ];
                this.changeLabelStatusProcess(this.statusProcessList);

                this.statusProcessList = this.statusProcessList.map(
                    (item: any) => {
                        if (item.id == undefined) {
                            return {
                                ...item,
                                statusProcessesName:
                                    item.statusProcessesName +
                                    ' (' +
                                    res.totalElement +
                                    ')',
                            };
                        } else {
                            return {
                                ...item,
                                statusProcessesName:
                                    item.statusProcessesName +
                                    ' (' +
                                    item.count +
                                    ')',
                                chosen: false,
                            };
                        }
                    },
                );

                if (
                    !this.selectedStatusProcess ||
                    Object.keys(this.selectedStatusProcess).length === 0
                ) {
                    this.selectedStatusProcess = this.statusProcessList[0];
                } else {
                    this.statusProcessList.forEach((item: any) => {
                        if (item.id != this.selectedStatusProcess.id) {
                            item.chosen = false;
                        } else {
                            item.chosen = true;
                        }
                    });
                }

                this.tagTotalElement = res.totalElement;
            },
        });
    }

    getPriorities() {
        this.levelList = [
            {
                id: undefined,
                name: '-- Tất cả --',
            },
        ];
        this.selectedLevel = this.levelList[0];

        this.priorityService.getComboBoxPriorities().subscribe({
            next: (res: PrioritiesResponse) => {
                this.levelList = [...this.levelList, ...res.data];
            },
        });
    }

    handleAddService() {
        this.router.navigateByUrl(`${this.router.url}/create`);
    }

    handleItemClick(data: any) {
        this.loading = true;
        this.screenRendererInput = {
            ...this.screenRendererInput,
            id: data.id,
        };
        this.appId = data.appId;
        this.discussName = data.discussName;
        this.roomStatus = data.roomStatus;
    }

    handleTagClick(selected: any) {
        this.selectedStatusProcess = selected;
        if (selected.type === 'PROCESS') {
            this.statusProcessList.forEach((item: any) => {
                if (item.id != selected.id) {
                    item.chosen = false;
                } else {
                    item.chosen = true;
                }
            });
        }
    }

    handleTagClear() {
        setTimeout(() => {
            this.selectedStatusProcess = this.statusProcessList[0];
        });
    }

    getOutputDateString(inputDate: any) {
        return `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${inputDate
            .getDate()
            .toString()
            .padStart(2, '0')}`;
    }

    handleTabClick(s: any) {
        this.statusProcessList.forEach((item: any) => {
            if (item.id != s.id) {
                item.chosen = false;
            } else {
                item.chosen = true;
            }
        });
        this.selectedStatusProcess = s;
        this.currentPage = 1;
        this.first = 0;
        this.callWarningList();
    }

    callWarningList(paginatorChange: boolean = false) {
        const priorityId = this.selectedLevel?.id?.toString() ?? '';
        const processingUnit = this.department?.id?.toString() ?? '';
        const createdAt =
            this.rangeDates
                ?.map((item) => {
                    // Format the date in the desired output format (YYYY-MM-DD HH:mm:ss)
                    return this.getOutputDateString(new Date(item));
                })
                .join(',') || '';
        const id = this.route.snapshot.params?.['serId'] || '';
        const filterStr = this.getAPIFilter(
            id,
            this.contentTitle,
            priorityId,
            createdAt,
            processingUnit,
            this.selectedStatusProcess,
        );
        this.serviceService
            .getWarningList(this.currentPage, this.rows, filterStr)
            .subscribe({
                next: (res: any) => {
                    this.warningList = res.data;
                    this.totalRecords = res.totalElement;
                    if (!paginatorChange) {
                        this.screenRendererInput = {
                            ...this.screenRendererInput,
                            id: this.warningList[0]?.id,
                        };
                        this.selectedWarning = this.warningList[0];
                        this.appId = this.warningList[0]?.appId;
                        this.discussName = this.warningList[0]?.discussName;
                        this.roomStatus = this.warningList[0]?.roomStatus;
                        this.loading = true;
                    }
                },
                error: () => {
                    this.warningList = [];
                    this.totalRecords = 0;
                    this.selectedWarning = null;
                    this.appId = '';
                    this.screenRendererInput = {
                        id: '',
                        accessToken: this.accessToken,
                    };
                },
            });
    }

    handleFloatingChatClick() {
        if (this.roomStatus === 1) {
            this.showDialog = true;
        } else {
            this.chatService
                .createChatRoom({
                    alarmId: this.selectedWarning?.id,
                    discussionName: this.selectedWarning?.title,
                    parentRoomId: '6639f4e096c427d018aef5ee',
                    memberEmails: this.selectedWarning?.groupMembers.map(
                        (member: any) => member.email,
                    ),
                })
                .subscribe({
                    next: (res: any) => {
                        this.callWarningList();
                    },
                });
        }
    }

    handlePageChange(event: any) {
        if (
            (event.rows !== this.rows || event.first !== this.first) &&
            typeof event.first == 'number' &&
            typeof event.rows == 'number'
        ) {
            this.rows = event.rows;
            this.first = event.first;
            this.currentPage = Math.ceil(event.first / event.rows) + 1;
            this.callWarningList(true);
        }
    }

    handleSearch() {
        this.currentPage = 1;
        this.first = 0;
        this.callWarningList();
        this.getStatusProcess();
    }

    handleContentChange(data: string) {
        this.contentTitle = data;
    }

    handleLevelChange(data: Priority) {
        this.selectedLevel = data;
    }

    handleLevelClear() {
        setTimeout(() => {
            this.selectedLevel = this.levelList[0];
        });
    }

    handleDepartmentChange(value: DepartmentTree) {
        this.department = value;
    }

    getAPIFilter(
        id: string = '',
        titleContent: string,
        priority: string,
        createdAt: string,
        processingUnit: string,
        selectedStatusProcess: any = undefined,
        forStatusProcess: boolean = false,
    ) {
        const filter: any = {};

        if (titleContent.length > 0) {
            filter.title = {
                _contains: titleContent,
            };
        }

        if (priority.length > 0) {
            filter.priorityId = {
                _eq: priority,
            };
        }

        if (!forStatusProcess && selectedStatusProcess?.id != undefined) {
            if (selectedStatusProcess?.type == 'STATUS') {
                filter.statusId = { _eq: `${selectedStatusProcess?.id}` };
            }
            if (selectedStatusProcess?.type == 'PROCESS') {
                filter.statusProcessesId = {
                    _eq: `${selectedStatusProcess?.id}`,
                };
            }
        }

        if (processingUnit.length > 0) {
            filter.agenciesId = {
                _eq: processingUnit,
            };
        }

        if (createdAt.length > 0) {
            filter.createdAt = {
                _between: createdAt,
            };
        }

        filter.isActive = {
            _eq: '1',
        };

        if (id.length > 0) {
            filter.fieldId = {
                _eq: id,
            };
        }

        const filterStr = encodeURIComponent(JSON.stringify(filter));
        return filterStr;
    }

    exportReport() {
        const priorityId = this.selectedLevel?.id?.toString() ?? '';
        const processingUnit = this.department?.id?.toString() ?? '';
        const createdAt =
            this.rangeDates
                ?.map((item) => {
                    return this.getOutputDateString(new Date(item));
                })
                .join(',') || '';

        const url = this.router.url;
        const service = this.serviceList.find((item: any) => {
            return url.includes(item.routerLink);
        });
        const id = this.route.snapshot.params?.['serId'] || '';
        const filterStr = this.getAPIFilter(
            id,
            this.contentTitle,
            priorityId,
            createdAt,
            processingUnit,
            this.selectedStatusProcess,
        );
        this.confirmationService.confirm({
            message: `Bạn sắp tải xuống danh sách cảnh báo ${service?.label} theo các tiêu chí đang tìm kiếm?`,
            header: 'Xác nhận tải xuống',
            icon: 'ti ti-info-circle',
            acceptLabel: 'Tải xuống',
            rejectLabel: 'Huỷ',
            accept: () => {
                this.serviceService.exportReport(filterStr).subscribe({
                    next: (res: any) => {
                        exportExcel(res, `Danh sách cảnh báo`);
                    },
                });
            },
        });
    }

    public onScreenRendererEvent(event: CustomEvent) {
        if (event.detail === 'reload') {
            this.serviceService
                .getAlarmDetail(this.screenRendererInput.id)
                .subscribe({
                    next: (res: any) => {
                        this.appId = res.data?.appId;
                    },
                });
        }

        if (event.detail === 'endLoading') {
            this.loading = false;
        }
    }
}

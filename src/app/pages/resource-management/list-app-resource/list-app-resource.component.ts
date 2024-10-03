import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IAppResourceManagement,
    IUpdateAppResourcePayload,
} from 'src/app/interface/system-management/resource-management.interface';
import { ResourceManagementService } from 'src/app/service/api/resource-management.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';

@Component({
    selector: 'app-list-app-resource',
    templateUrl: './list-app-resource.component.html',
    styleUrl: './list-app-resource.component.scss',
})
export class ListAppResourceComponent
    extends AppComponentBase
    implements OnInit
{
    nodes!: TreeNode[];
    listResource: TreeNode[] = [];
    totalCount: number = 0;
    showActionButtons: boolean = false;
    constructor(
        injector: Injector,
        private readonly resourceManagementService: ResourceManagementService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly verificationService: VerificationService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.callListResource();
    }

    callListResource() {
        this.isLoading = true;
        this.resourceManagementService
            .getApplicationResource()
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                this.listResource = this.mapToTreeNodes(rs.data);
                this.totalCount = rs.totalElement;
            });
    }

    mapToTreeNodes(data: IAppResourceManagement[]) {
        const groupedData = data.reduce((acc, item) => {
            const {
                id,
                name,
                groupAppId,
                groupAppName,
                attachFileMobile,
                attachFileWeb,
                parentId,
            } = item;

            if (!acc.has(groupAppId)) {
                acc.set(groupAppId, {
                    key: groupAppId,
                    label: groupAppName,
                    children: [],
                });
            }

            acc.get(groupAppId).children.push({
                key: id,
                label: name,
                data: attachFileMobile || attachFileWeb,
                type: 'url',
            });

            return acc;
        }, new Map());

        return Array.from(groupedData.values());
    }

    handleDelete(node: TreeNode) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa ứng dụng <strong>${node.label} </strong>?`,
            () => {
                this.resourceManagementService
                    .deleteApplicationResource(node.key)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((rs) => {
                        this.apiHandlerService.handleSuccess(
                            rs,
                            () => {
                                this.callListResource();
                            },
                            200,
                        );
                    });
            },
        );
    }

    handleNavigateCreate() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    handleNavigateUpdate(node: TreeNode) {
        this.router.navigate(['update'], {
            relativeTo: this.route,
            queryParams: {
                id: node.key,
            },
        });
    }
}

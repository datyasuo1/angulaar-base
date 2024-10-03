import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import { finalize, switchMap } from 'rxjs';
import { AssignableService } from 'src/app/service/api/assignable.service';
import {
    FeatureGroup,
    FeatureGroupService,
    FeatureGroupsResponse,
} from 'src/app/service/api/feature-group.service';
import { UserResponse, UserService } from 'src/app/service/api/user.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-decentralization',
    templateUrl: './decentralization.component.html',
    styleUrl: './decentralization.component.scss',
})
export class DecentralizationComponent {
    constructor(
        private featureGroupService: FeatureGroupService,
        private route: ActivatedRoute,
        private userService: UserService,
        private assignableService: AssignableService,
        private apiHandlerService: ApiHandlerService,
        private location: Location,
        private userInfoService: UserInfoService,
        private router: Router,
    ) {}

    @Input() viewOnly: boolean = false;

    ngOnInit() {
        this.userId = parseInt(decryptLong(this.route.snapshot.params?.['id']));
        this.getPermissionTree();
    }

    userId: number;

    features: FeatureGroup[] = [];

    selectedFeatures: FeatureGroup[] = [];

    treeLoading: boolean = false;

    flattenFeatures: any[] = [];

    flattenFeaturesAll: any[] = [];

    notSelectedFeatures: FeatureGroup[] = [];

    comparator(obj1: any, obj2: any) {
        return obj1.id === obj2.id;
    }

    handleSelectChange(data: FeatureGroup[]): void {
        this.selectedFeatures = data;
    }

    getPermissionTree() {
        this.treeLoading = true;
        this.featureGroupService
            .getFeatureGroups(true, true, this.userId.toString())
            .pipe(
                switchMap((res: FeatureGroupsResponse) => {
                    this.features = res.data;
                    this.addDragAndDrop(this.features);
                    return this.userService.getUserById(this.userId.toString());
                }),
                finalize(() => {
                    this.treeLoading = false;
                }),
            )
            .subscribe({
                next: (res: UserResponse) => {
                    const data = res.data;
                    this.notSelectedFeatures = data.userPermissionConfig;

                    const getMembers = (mem: any) => {
                        const member = {
                            key: mem.key,
                            type: mem.type,
                            id: mem.id,
                        }; // copy

                        if (!mem.children || !mem.children.length) {
                            return {
                                key: member.key,
                                type: member.type,
                                id: member.id,
                            }; // return copied
                        }

                        // return copied, but pass original to flatMapDeep
                        return [
                            member,
                            _.flatMapDeep(mem.children, getMembers),
                        ];
                    };

                    this.flattenFeaturesAll = _.flatMapDeep(
                        this.features,
                        getMembers,
                    );

                    this.selectedFeatures = _.differenceWith(
                        this.flattenFeaturesAll,
                        this.notSelectedFeatures,
                        this.comparator,
                    );
                },
            });
    }

    loading = false;

    handleUpdate() {
        this.selectedFeatures = this.selectedFeatures.filter(
            (item: FeatureGroup) =>
                this.flattenFeaturesAll
                    .map((feature: any) => feature.id)
                    .includes(item.id),
        );

        this.notSelectedFeatures = _.differenceWith(
            this.flattenFeaturesAll,
            this.selectedFeatures,
            this.comparator,
        );

        let pers = this.notSelectedFeatures
            .filter((r: any) => r.type == 'PERMISSION')
            .map((item: any) => item.id);

        pers = pers.filter((item) =>
            this.flattenFeaturesAll
                .map((feature: any) => feature.id)
                .includes(item),
        );

        const body = {
            userId: this.userId,
            permissionIds: pers,
            userPermissionConfig: this.notSelectedFeatures.map((item: any) => ({
                key: item.key,
                type: item.type,
                id: item.id,
            })),
        };
        this.loading = true;

        this.assignableService
            .deleteRolePermissionsFromUser(body)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: CommonResponse) => {
                    this.apiHandlerService.handleSuccess(
                        res,
                        async () => {
                            await this.userInfoService.updateLocalUserInfo();
                            this.location.back();
                        },
                        200,
                    );
                },
            });
    }

    handleNodeDrop(data: FeatureGroup[]) {
        this.features = data;
        this.flattenFeatures = [];
        this.setFlattenFeatures(this.features, null);
    }

    setFlattenFeatures(features: any[], id: any) {
        features.forEach((item) => {
            if (item.type == 'CATEGORY') {
                this.flattenFeatures.push({
                    key: item.key,
                    type: item.type,
                    id: item.id,
                    parentId: id,
                });
            }
            if (item.children && item.children.length > 0) {
                this.setFlattenFeatures(item.children, item.id);
            }
        });
    }

    addDragAndDrop(features: any[]) {
        features.forEach((feature) => {
            if (feature.type == 'CATEGORY') {
                feature.draggable = true;
                feature.droppable = true;
            }
            if (feature.type == 'PERMISSION') {
                feature.draggable = false;
                feature.droppable = false;
            }
            if (feature.children && feature.children.length > 0) {
                this.addDragAndDrop(feature.children);
            }
        });
    }

    handleClose() {
        this.router.navigate(['user-permission', 'user']);
    }
}

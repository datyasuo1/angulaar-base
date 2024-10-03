import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { finalize, switchMap } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { RoleTypeComboBox } from 'src/app/interface';
import { AssignableService } from 'src/app/service/api/assignable.service';
import {
    FeatureGroup,
    FeatureGroupService,
    FeatureGroupsResponse,
} from 'src/app/service/api/feature-group.service';
import { RoleService } from 'src/app/service/api/role.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-update-role',
    templateUrl: './update-role.component.html',
    styleUrls: ['./update-role.component.scss'],
})
export class UpdateRoleComponent extends FormBaseComponent {
    constructor(
        private route: ActivatedRoute,
        private roleService: RoleService,
        private featureGroupService: FeatureGroupService,
        private assignableService: AssignableService,
        private location: Location,
        private userInfoService: UserInfoService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    code: string = '';

    errorCode: string = '';

    name: string = '';

    errorName: string = '';

    type: RoleTypeComboBox;

    types: RoleTypeComboBox[] = [
        {
            name: 'GROUP',
            code: 'GROUP',
        },
        {
            name: 'USER',
            code: 'USER',
        },
    ];

    errorType: string = '';

    features: FeatureGroup[] = [];

    selectedFeatures: FeatureGroup[] = [];

    notSelectedFeatures: FeatureGroup[] = [];

    treeLoading: boolean = false;

    ngOnInit() {
        this.getPermissionTree();
    }

    addDragAndDrop(features: FeatureGroup[]) {
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

    // Custom comparator function to compare objects by id
    comparator(obj1: any, obj2: any) {
        return obj1.id === obj2.id;
    }

    getPermissionTree() {
        this.treeLoading = true;
        this.featureGroupService
            .getFeatureGroups(true)
            .pipe(
                switchMap((res: FeatureGroupsResponse) => {
                    const id = parseInt(
                        decryptLong(this.route.snapshot.params?.['id']),
                    );
                    this.features = res.data;
                    this.addDragAndDrop(this.features);
                    return this.roleService.getRoleById(id);
                }),
                finalize(() => {
                    this.treeLoading = false;
                }),
            )
            .subscribe({
                next: (res: any) => {
                    const data = res.data;
                    this.notSelectedFeatures = res.data.rolePermissionConfig;

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

                    this.name = data?.name;
                    this.code = data?.code;
                    this.type = this.types.filter(
                        (r: RoleTypeComboBox) => r.name == data?.type,
                    )[0];
                },
            });
    }

    handleUpdate() {
        let pers = this.selectedFeatures
            .filter((r: any) => r.type == 'PERMISSION')
            .map((item: any) => item.id);

        pers = pers.filter((item) =>
            this.flattenFeaturesAll
                .map((feature: any) => feature.id)
                .includes(item),
        );

        this.selectedFeatures = this.selectedFeatures.filter((item: any) =>
            this.flattenFeaturesAll
                .map((feature: any) => feature.id)
                .includes(item.id),
        );

        this.notSelectedFeatures = _.differenceWith(
            this.flattenFeaturesAll,
            this.selectedFeatures,
            this.comparator,
        );

        const body = {
            roleId: parseInt(decryptLong(this.route.snapshot.params?.['id'])),
            permissionIds: pers,
            rolePermissionConfig: this.notSelectedFeatures.map((item: any) => ({
                key: item.key,
                type: item.type,
                id: item.id,
            })),
            rolePermissionConfigIndex: this.flattenFeatures,
        };
        this.loading = true;

        this.assignableService
            .updateRolePermissions(body)
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
                        201,
                    );
                },
            });
    }

    handleClose() {
        this.location.back();
    }

    flattenFeatures: any[] = [];

    flattenFeaturesAll: any[] = [];

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

    handleNodeDrop(data: FeatureGroup[]) {
        this.features = data;
        this.flattenFeatures = [];
        this.setFlattenFeatures(this.features, null);
    }

    handleSelectChange(data: FeatureGroup[]) {
        this.selectedFeatures = data;
    }
}

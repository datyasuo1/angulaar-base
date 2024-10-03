import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    CommonPropertyResourceType,
    ResourcesTypeService,
    ResourceType,
    ResourceTypeResponse,
} from 'src/app/service/api/resources-type.service';
import { decryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-watch-resource-type',
    templateUrl: './watch-resource-type.component.html',
    styleUrls: ['./watch-resource-type.component.scss'],
})
export class WatchResourceTypeComponent implements OnInit {
    data: ResourceType;

    id: number;

    isPublic: boolean = true;

    isDefaultOnMap: boolean = true;

    commonProperties: CommonPropertyResourceType[] = [];

    constructor(
        private resourceTypesService: ResourcesTypeService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.id = parseInt(decryptLong(this.route.snapshot.params?.['id']));
        this.callAPIOneResourceTypeById();
    }

    callAPIOneResourceTypeById() {
        this.resourceTypesService.getResourceTypeById(this.id).subscribe({
            next: (res: ResourceTypeResponse) => {
                this.data = res.data;
                this.isPublic = res.data.isPublic === 1;
                this.isDefaultOnMap = res.data.isDefaultOnMap === 1;
                this.commonProperties = res.data?.commonProperties;
            },
        });
    }

    handleCloseOneResourceType() {
        this.router.navigate(['category', 'resources-type']);
    }
}

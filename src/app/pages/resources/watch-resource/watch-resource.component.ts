import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MapComponent } from 'src/app/components/core/map/map.component';
import { CommonPropertyResourceType } from 'src/app/service/api/resources-type.service';
import {
    ResourceResponse,
    ResourcesService,
} from 'src/app/service/api/resources.service';
import { decryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-watch-resource',
    templateUrl: './watch-resource.component.html',
    styleUrls: ['./watch-resource.component.scss'],
})
export class WatchResourceComponent implements OnInit {
    @ViewChild(MapComponent) mapComponent!: MapComponent;

    map: any;

    data: any;

    loading: boolean = false;

    id: number;

    valueTypes: any[] = [
        {
            value: 'Số',
            code: 'number',
        },
        {
            value: 'Chuỗi',
            code: 'text',
        },
        {
            value: 'Có/Không',
            code: 'yes_no',
        },
    ];

    specialityProperties: any[] = [];

    commonProperties: CommonPropertyResourceType[] = [];

    constructor(
        private resourcesService: ResourcesService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.id = parseInt(decryptLong(this.route.snapshot.params?.['id']));
        this.getResourceById();
    }

    ngAfterViewInit() {
        this.mapComponent.setMap();
        this.map = this.mapComponent.getMap();
    }

    getResourceById() {
        this.loading = true;
        this.resourcesService
            .getResourceById(this.id)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: ResourceResponse) => {
                    this.data = res.data;
                    this.specialityProperties = this.data.specialityProperties;
                    this.specialityProperties.forEach(
                        (p) =>
                            (p.type = this.valueTypes.find(
                                (item) => item.code === p.type,
                            )),
                    );
                    this.commonProperties = res.data?.commonProperties;
                    this.mapComponent.addMarker(
                        parseFloat(this.data?.lng),
                        parseFloat(this.data?.lat),
                        this.map,
                    );
                },
            });
    }

    handleCloseOneResource() {
        this.router.navigate(['system-management', 'resources']);
    }

    handleClearAddress() {}
}

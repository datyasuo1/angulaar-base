import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapComponent } from 'src/app/components/core/map/map.component';
import { PublicInfoService } from 'src/app/service/api/public-info.service';
import { decryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-watch-public-info',
    templateUrl: './watch-public-info.component.html',
    styleUrls: ['./watch-public-info.component.scss'],
})
export class WatchPublicInfoComponent implements OnInit {
    @ViewChild(MapComponent) mapComponent: MapComponent;

    data: any;

    id: number;

    map: any;

    constructor(
        private publicinfosService: PublicInfoService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.id = parseInt(decryptLong(this.route.snapshot.params?.['id']));
        this.callAPIOnePublicInfoById();
    }

    ngAfterViewInit(): void {
        this.mapComponent.setMap();
        this.map = this.mapComponent.getMap();
    }

    callAPIOnePublicInfoById() {
        this.publicinfosService.getPublicInfoById(this.id).subscribe({
            next: (res: any) => {
                this.data = res.data;

                this.mapComponent.addMarker(
                    parseFloat(this.data?.startLng),
                    parseFloat(this.data?.startLat),
                    this.map,
                );

                this.mapComponent.addMarker(
                    parseFloat(this.data?.endLng),
                    parseFloat(this.data?.endLat),
                    this.map,
                );

                this.map.on('load', () => {
                    this.mapComponent.drawDirection(
                        `${this.data?.startLng},${this.data?.startLat}`,
                        `${this.data?.endLng},${this.data?.endLat}`,
                    );
                });
            },
        });
    }

    handleCloseOnePublicInfo() {
        this.router.navigate(['system-management', 'public-info']);
    }
}

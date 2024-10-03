import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import {
    Vms,
    VmsManagementService,
    VmsResponse,
} from 'src/app/service/api/vms-management.service';
import { decryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-watch-vms-management',
    templateUrl: './watch-vms-management.component.html',
    styleUrls: ['./watch-vms-management.component.scss'],
})
export class WatchVmsManagementComponent implements OnInit {
    data: Vms;

    loading: boolean = false;

    id: number;

    name: string;

    vmsCategoryName: string;

    wardName: string;

    districtName: string;

    provinceName: string;

    url: string;

    isActive: string;

    username: string;

    password: string;

    hiddenPassword: string;

    isPublic: boolean = true;

    constructor(
        private vmsManagementService: VmsManagementService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.id = parseInt(decryptLong(this.route.snapshot.params?.['id']));
        this.callAPIOneVMSById();
    }

    toggleCheckbox(event: Event): void {
        event.preventDefault();
        this.isPublic = !this.isPublic;
    }

    callAPIOneVMSById() {
        this.loading = true;
        this.vmsManagementService
            .getVmsManagementById(this.id)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: VmsResponse) => {
                    this.data = res.data;
                    const passwordLength = this.data?.password
                        ? this.data.password.length
                        : 0;
                    this.hiddenPassword = '*'.repeat(passwordLength);
                    this.isPublic = res.data.isPublic;
                },
            });
    }

    handleCloseOneVms() {
        this.router.navigate(['system-management', 'vms-management']);
    }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGroupService } from 'src/app/service/api/user-group.service';
import { IOCRole } from 'src/app/service/api/user.service';
import { decryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-detail-user-group',
    templateUrl: './detail-user-group.component.html',
    styleUrl: './detail-user-group.component.scss',
})
export class DetailUserGroupComponent {
    id: string = '';

    userGroupData: any;

    role: string = '';

    constructor(
        private userGroupService: UserGroupService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.id = decryptLong(this.activatedRoute.snapshot.params['id']);
        this.getUserGroupById();
    }

    getUserGroupById() {
        this.userGroupService.getUserGroupById(this.id).subscribe({
            next: (data: any) => {
                this.userGroupData = data?.data;
                this.role = this.userGroupData.iocRoles
                    .map((item: IOCRole) => {
                        return item?.name;
                    })
                    .join(', ');
            },
        });
    }

    handleClose() {
        this.router.navigate(['user-permission', 'user-group']);
    }
}

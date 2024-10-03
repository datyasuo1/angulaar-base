import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gentle } from 'src/app/interface';
import {
    IOCRole,
    User,
    UserResponse,
    UserService,
} from 'src/app/service/api/user.service';
import { decryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-detail-user',
    templateUrl: './detail-user.component.html',
    styleUrl: './detail-user.component.scss',
})
export class DetailUserComponent {
    id: string = '';

    userData: User;

    role: string = '';
    gentles: Gentle[] = [
        { label: 'Nam', code: '1' },
        { label: 'Nữ', code: '2' },
        { label: 'Chưa xác định', code: '3' },
    ];

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.id = decryptLong(this.activatedRoute.snapshot.params['id']);
        this.getUserById();
    }

    getUserById() {
        this.userService.getUserById(this.id).subscribe({
            next: (data: UserResponse) => {
                this.userData = data?.data;
                this.role = this.userData.iocRoles
                    .map((item: IOCRole) => {
                        return item?.name;
                    })
                    .join(', ');
            },
        });
    }

    handleClose() {
        this.router.navigate(['user-permission', 'user']);
    }

    getSex(code: number) {
        return this.gentles.filter(
            (item: Gentle) => item.code === code.toString(),
        )[0]?.label;
    }
}

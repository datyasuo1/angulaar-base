import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { LanguageService } from 'src/app/service/app/language.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent implements OnInit {
    @Input() visible: boolean = false;

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

    navItems: any[] = [];

    constructor(
        public l: LanguageService,
        public layoutService: LayoutService,
        public el: ElementRef,
        private userInfoService: UserInfoService,
    ) {}

    ngOnInit() {
        this.initNavItems();
    }

    initNavItems() {
        this.userInfoService.updateUserMenu$.subscribe({
            next: (res: any) => {
                this.navItems = [
                    {
                        label: '',
                        items: res,
                    },
                ];
            },
        });
    }

    handleVisibleChange(event: boolean) {
        this.visibleChange.emit(event);
        this.initNavItems();
    }
}

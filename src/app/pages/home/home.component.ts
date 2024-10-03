import {
    animate,
    query,
    stagger,
    style,
    transition,
    trigger,
} from '@angular/animations';
import {
    Component,
    HostListener,
    Injector,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ApplicationService } from 'src/app/service/api/application.service';
import { ToastService } from 'src/app/service/app/toast.service';
import {
    HomeConfigService,
    HomeDashboardResponse,
} from 'src/app/service/api/home-config.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('itemAnimation', [
            transition('* => *', [
                // each time the binding value changes
                query(
                    ':enter',
                    [
                        style({ transform: 'translateY(100%)' }),
                        stagger(100, [
                            animate(
                                '0.3s',
                                style({ transform: 'translateY(0)' }),
                            ),
                        ]),
                    ],
                    { optional: true },
                ),
            ]),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent extends AppComponentBase implements OnInit {
    cards: any[] = [];

    homeConfigData?: any;

    isHovered: any[] = [];

    groupApplicationData: any[] = [];

    data: any;

    searchText: string = '';

    selectedSearchApplication: any;
    imageSlide = [];

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5,
        },
        {
            breakpoint: '1920px',
            numVisible: 5,
        },
        {
            breakpoint: '768px',
            numVisible: 5,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
        },
    ];
    constructor(
        injector: Injector,
        private router: Router,
        private userInfoService: UserInfoService,
        private homeConfigService: HomeConfigService,
        private applicationService: ApplicationService,
    ) {
        super(injector);
    }

    numVisible: number;

    getNumVisible() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 768) {
            this.numVisible = Math.min(3, this.cards.length);
        }
        if (screenWidth >= 992) {
            this.numVisible = Math.min(4, this.cards.length);
        }
        if (screenWidth >= 1200) {
            this.numVisible = Math.min(5, this.cards.length);
        }
        if (screenWidth >= 1400) {
            this.numVisible = Math.min(6, this.cards.length);
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.getNumVisible(); // Call method to update num visible on resize
    }

    onMouseEnter(i: number) {
        this.isHovered[i] = true;
    }

    handleInputChange(data: any) {
        this.searchText = data.query;
        this.getListAppByName();
    }

    handleSelectFunction(data: any) {
        if (data.value.statusName == 'Đang phát triển') {
            this.toastService.showInfo(
                'Thông báo',
                'Ứng dụng đang phát triển',
                5000,
            );
        } else if (data.value.statusName == 'Đang hoạt động') {
            if (data.value.categoryName == 'External') {
                window.open(data.value.url, '_blank');
            } else if (data.value.categoryName == 'Internal') {
                this.router.navigateByUrl(data.value.url);
            }
        }
    }

    onMouseLeave(i: number) {
        this.isHovered[i] = false;
    }

    showImage(obj: any) {
        if (obj && Object.keys(obj).length > 0) {
            return true;
        }
        return false;
    }

    ngOnInit() {
        this.isLoading = true;
        this.cards =
            this.userInfoService
                .getUserInfo()
                ?.iocMenus.find((item: any) => item.label == 'Dịch vụ')
                ?.items || [];

        this.isHovered = this.cards.map(() => false);

        this.homeConfigService
            .getComboBoxHomeDashboard()
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe({
                next: (res: HomeDashboardResponse) => {
                    this.homeConfigData = res.data;
                    this.imageSlide = res.data.image;
                },
            });

        this.getGroupApp();
        this.getListApp();
    }

    handleCardClick(link: string) {
        this.router.navigateByUrl(link);
    }

    getGroupApp() {
        this.applicationService.getGroupApplication().subscribe({
            next: (res: any) => {
                this.groupApplicationData = res.data;
            },
        });
    }

    getListApp() {
        this.applicationService
            .getListApplications(this.searchText, -1, 1)
            .subscribe({
                next: (res: any) => {
                    this.data = res.data;
                    // this.selectedSearchApplication = res.data
                },
            });
    }

    getListAppByName() {
        this.applicationService
            .getListApplicationsByName(this.searchText, -1, 1)
            .subscribe({
                next: (res: any) => {
                    this.data = res.data;
                    // this.selectedSearchApplication = res.data
                },
            });
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.checkScroll();
    }

    scrollToBottom(): void {
        const secondSection = document.getElementById('secondSectionId');
        if (secondSection) {
            secondSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    checkScroll(): void {
        const scrollButton = document.getElementById('scroll-button-container');
        const firstSection = document.getElementById('firstSectionId');

        if (scrollButton && firstSection) {
            const firstSectionTop = firstSection.getBoundingClientRect().top;

            if (firstSectionTop <= 0) {
                scrollButton.classList.add('hidden');
            } else if (firstSectionTop >= 0) {
                scrollButton.classList.remove('hidden');
            }
        }
    }
}

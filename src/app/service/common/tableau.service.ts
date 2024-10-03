import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TableauService {
    private baseUrl = environment.baseURL;

    private token = localStorage.getItem('access_token');

    constructor(private http: HttpClient) {}

    getTickets() {
        const options = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.token}`,
                tenant: 'danang',
            }),
        };

        // return this.http.get(`${this.baseUrl}/tbl/getTicket`, options);
        return of(null);
    }

    getServiceById(id: number) {
        const services = [
            {
                id: 1,
                name: 'Phản ánh hiện trường',
                link: 'https://tbl.ioc-cloud.com/views/DNG_GopY_FN_04012024/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
            },
            {
                id: 2,
                name: 'Kinh tế xã hội',
                link: 'https://tbl.ioc-cloud.com/views/KTXH_DNG_05012023_2/BocoTW?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
            },
            {
                id: 3,
                name: 'Dịch vụ công',
                link: 'https://tbl.ioc-cloud.com/views/DNG_GopY_FN_04012024/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
            },
            {
                id: 4,
                name: 'Thông tin truyền thông',
                link: 'https://tbl.ioc-cloud.com/views/3_DNG_Reputa_huyennt164_20_16953552299340/Reputa?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
            },
            {
                id: 5,
                name: 'Thông tin doanh nghiệp',
                link: 'https://tbl.ioc-cloud.com/views/4_RiroDN_2006_2/Tngquan?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
            },
            {
                id: 6,
                name: 'Giáo dục, đào tạo',
                link: 'https://tbl.ioc-cloud.com/views/GiodcDNG_v2_0/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
            },
            {
                id: 7,
                name: 'Quan trắc môi trường',
                link: 'https://tbl.ioc-cloud.com/views/Quantrc_v8_16963179714560/Dashboard2?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
            },
            {
                id: 8,
                name: 'Mưa ngập',
                link: 'https://tbl.ioc-cloud.com/views/Mangp_v1_0_16995902516850/Dashboard1612h?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
            },
            {
                id: 9,
                name: 'Đơn thư, tiếp công dân',
                link: 'https://tbl.ioc-cloud.com/views/nth_new_16959509507780/nth?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
            },
        ];
        return of(services.filter((item) => item.id == id));
    }
}

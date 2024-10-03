import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MapService {
    private key = environment.mapAccessToken;

    constructor(private http: HttpClient) {}

    getRelatedLocations(text: string, off: number, limit: number, key: string) {
        const options = {
            params: new HttpParams()
                .set('t', text)
                .set('off', off)
                .set('lm', limit)
                .set('k', key),
        };
        return this.http.get(
            'https://api-maps.viettel.vn/gateway/placeapi/v2-old/place-api/VTMapService/placeService/geocoding',
            options,
        );
    }

    getLatLngFromText(text: string) {
        const options = {
            params: new HttpParams().set('address', text).set('key', this.key),
        };

        return this.http.get(
            'https://api-maps.viettel.vn/gateway/placeapi/v2/place-api/geocode',
            options,
        );
    }

    nonAccentVietnamese(str: string) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    removeAccentVietnamese(arr: any[]) {
        return new Promise((res, rej) => {
            for (let i = 0; i < arr.length; i++) {
                arr[i] = this.nonAccentVietnamese(arr[i]);
                if (i === arr.length - 1) {
                    res(arr.join(''));
                }
            }
        });
    }
}

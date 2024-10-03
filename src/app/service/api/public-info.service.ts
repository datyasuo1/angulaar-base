import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface PublicInfo {
    id: number;
    name: string;
    publicInfoTypeId: number;
    publicInfoTypeName: string;
    startTime: string;
    startAddress: string;
    startLat: number;
    startLng: number;
    endTime: string;
    endAddress: string;
    endLat: number;
    endLng: number;
    wayPoints: number[][];
    wardCode: string;
    wardName: string;
    districtCode: string;
    districtName: string;
    provinceCode: string;
    provinceName: string;
}

export interface PublicInfosResponse {
    code: number;
    message: string;
    data: PublicInfo[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface PublicInfoType {
    id: number;
    name: string;
    image: string | null;
    type: string;
    imageHost: string;
}

export interface PublicInfoTypesResponse {
    code: number;
    message: string;
    data: PublicInfoType[];
    totalElement: number;
}

export interface AddPublicInfoBody {
    id?: number;
    name: string;
    infoTypeId: number;
    startTime: string | Date;
    startAddress: string;
    startLat: number;
    startLng: number;
    endTime: string | Date;
    endAddress: string;
    endLat: number;
    endLng: number;
    wardCode: string;
    districtCode: string;
    provinceCode: string;
    wayPoints?: number[][];
}

export interface UpdatePublicInfoBody {
    id?: number;
    name: string;
    infoTypeId: number;
    startTime: string | Date;
    startAddress: string;
    startLat: number;
    startLng: number;
    endTime: string | Date;
    endAddress: string;
    endLat: number;
    endLng: number;
    wardCode: string;
    districtCode: string;
    provinceCode: string;
    wayPoints?: number[][];
}

export interface PublicInfoResponse {
    code: number;
    message: string;
    data: PublicInfo;
}
@Injectable({
    providedIn: 'root',
})
export class PublicInfoService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getPublicInfos(
        page: number,
        perPage: number,
        searchText: string,
        place: string,
        type: string,
    ): Observable<PublicInfosResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', place)
                .set('type', type),
        };
        return this.http.get<PublicInfosResponse>(
            `${this.baseUrl}/rs/public-infos`,
            options,
        );
    }

    getComboBoxPublicInfos(
        page: number,
        perPage: number,
        searchText: string,
        place: string,
        type: string,
    ): Observable<PublicInfosResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', place)
                .set('type', type),
        };
        return this.http.get<PublicInfosResponse>(
            `${this.baseUrl}/rs/combo-box/public-infos`,
            options,
        );
    }

    getPublicInfosTypes(
        page: number,
        perPage: number,
        searchText: string,
    ): Observable<PublicInfoTypesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText),
        };
        return this.http.get<PublicInfoTypesResponse>(
            `${this.baseUrl}/rs/public-info-types`,
            options,
        );
    }

    getPublicInfoById(id: number): Observable<PublicInfoResponse> {
        return this.http.get<PublicInfoResponse>(
            `${this.baseUrl}/rs/public-infos/${id}`,
        );
    }

    createPublicInfos(data: AddPublicInfoBody): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/rs/public-infos`,
            data,
        );
    }

    updatePublicInfos(
        data: UpdatePublicInfoBody,
        id: number,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/rs/public-infos/${id}`,
            data,
        );
    }

    deletePublicInfos(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/rs/public-infos/${id}`,
        );
    }
}

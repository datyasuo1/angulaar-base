import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

export interface AdministrativeUnit {
    code: string;
    name: string;
    level: string;
    levelId: number;
    parentId: string | null;
    parentName: string | null;
}

export interface AdministrativeUnitsResponse {
    code: number;
    message: string;
    data: AdministrativeUnit[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface Level {
    id: number;
    name: string;
}

export interface LevelsResponse {
    code: number;
    message: string;
    data: Level[];
}

export interface AdministrativeUnitTree {
    code: string;
    wardCode: string | null;
    districtCode: string | null;
    provinceCode: string;
    name: string;
    unitId: number;
    key: string;
    label: string;
    children: AdministrativeUnitTree[];
}

export interface AdministrativeUnitsTreeResponse {
    code: number;
    message: string;
    data: AdministrativeUnitTree[];
}

interface UpdateAURequestBody {
    name?: string;
    parentId?: string;
    unitId?: number;
    oldUnitId?: number;
    newUnitId?: number;
}

interface AddAURequestBody {
    name?: string;
    parentId?: string;
    unitId?: number;
    oldUnitId?: number;
    newUnitId?: number;
}

@Injectable({
    providedIn: 'root',
})
export class AdministrativeUnitService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL;

    getAdministrativeUnits(
        unitId: string = '',
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        place: string = ',,',
    ): Observable<AdministrativeUnitsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', place)
                .set('unitId', unitId),
        };
        return this.http.get<AdministrativeUnitsResponse>(
            `${this.baseUrl}/rs/administrative-units`,
            options,
        );
    }

    getComboBoxAdministrativeUnits(
        unitId: string = '',
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        place: string = ',,',
    ): Observable<AdministrativeUnitsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', place)
                .set('unitId', unitId),
        };
        return this.http.get<AdministrativeUnitsResponse>(
            `${this.baseUrl}/rs/combo-box/administrative-units`,
            options,
        );
    }

    getAULevels(): Observable<LevelsResponse> {
        return this.http.get<LevelsResponse>(
            `${this.baseUrl}/rs/administrative-units/level`,
        );
    }

    getAdministrativeUnitsTree(): Observable<AdministrativeUnitsTreeResponse> {
        return this.http.get<AdministrativeUnitsTreeResponse>(
            `${this.baseUrl}/rs/combo-box/administrative-units/tree`,
        );
    }

    updateAU(
        body: UpdateAURequestBody,
        id: string,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/rs/administrative-units/${id}`,
            body,
        );
    }

    addAU(body: AddAURequestBody): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/rs/administrative-units`,
            body,
        );
    }

    deleteAU(id: string, levelId: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/rs/administrative-units/${id}`,
            {
                body: {
                    unitId: levelId,
                },
            },
        );
    }
}

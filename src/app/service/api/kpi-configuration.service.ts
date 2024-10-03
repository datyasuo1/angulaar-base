import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse, Image } from '../common';
export interface KPI {
    id: number;
    name: string;
    ruleTypeName: string;
    createdBy: string;
    createdByName: string;
    createdAt: string;
}

export interface KPIsResponse {
    code: number;
    message: string;
    data: KPI[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface Params {
    id: number;
    name: string;
    type: string;
    operations: string[];
}

export interface KPIPatternRule {
    id: string;
    name: string;
    params: Params[];
}

export interface KPIPatternRulesResponse {
    code: number;
    message: string;
    data: KPIPatternRule[];
    totalElement: number;
}

//

export interface Operation {
    code: string;
    name: string;
}

export interface SelectedParameter {
    id: number;
    name: string;
    type: string;
    operations: string[];
}

export interface GroupCondition {
    id: string;
    type: string;
    group: any[];
    value: string;
    operation: string;
    errorValue: string;
    operations: Operation[];
    parameterName: string;
    parameterType: string;
    errorParameter: string;
    selectedParameter: SelectedParameter;
    comparisonConditions: Operation[];
    errorComparisonCondition: string;
    selectedComparisonCondition: Operation;
    children: GroupCondition[];
}

export interface Parameters {
    json: {
        files: Image[];
        title: string;
        content: string;
        field_id: number;
        priority_id: number;
        location: string;
    };
}

export interface Action {
    type: string;
    parameters: Parameters;
}

export interface Params {
    id: number;
    name: string;
    type: string;
    operations: string[];
}

export interface PatternRule {
    id: string;
    name: string;
    params: Params[];
}

export interface Kpi {
    id: number;
    name: string;
    kpipatternRuleId: string;
    ruleTypeName: string;
    createdAt: string;
    groupConditions: GroupCondition[];
    actions: Action[];
    patternRule: PatternRule;
}

export interface KpiResponse {
    code: number;
    message: string;
    data: Kpi;
}
@Injectable({
    providedIn: 'root',
})
export class KpiConfigurationService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getKpiConfiguration(
        page: number,
        perPage: number,
        searchText: string,
    ): Observable<KPIsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText),
        };
        return this.http.get<KPIsResponse>(
            `${this.baseUrl}/configuration/kpi-visual-rule`,
            options,
        );
    }

    getServiceType(): Observable<KPIPatternRulesResponse> {
        return this.http.get<KPIPatternRulesResponse>(
            `${this.baseUrl}/configuration/kpi-pattern-rule`,
        );
    }

    createKpiConfiguration(data: any): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/configuration/kpi-visual-rule`,
            data,
        );
    }

    getKpiConfigurationById(id: string): Observable<KpiResponse> {
        return this.http.get<KpiResponse>(
            `${this.baseUrl}/configuration/kpi-visual-rule/${id}`,
        );
    }

    updateKpiConfiguration(data: any, id: string): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/configuration/kpi-visual-rule/${id}`,
            data,
        );
    }

    deleteKpiConfiguration(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/configuration/kpi-visual-rule/${id}`,
        );
    }
}

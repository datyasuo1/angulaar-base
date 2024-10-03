import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { KPIPatternRule } from '../api/kpi-configuration.service';
import { Field } from '../api/field.service';
import { Priority } from '../api/priority.service';
export interface Threshold {
    kpiConfiguraionName: string;
    selectedServiceType: KPIPatternRule;
    list: any[];
    serviceTypes: KPIPatternRule[];
    parameters: any[];
}

export interface Alert {
    kpiConfigurationTitle: string;
    selectedField: Field;
    selectedLevel: Priority;
    fields: Field[];
    levels: Priority[];
    content: string;
    address: string;
}
@Injectable()
export class KpiConfigInfoService {
    constructor() {}

    threshold = {
        kpiConfiguraionName: '',
        selectedServiceType: null,
        list: [],
        serviceTypes: [],
        parameters: [],
    };

    alert = {
        kpiConfigurationTitle: '',
        selectedField: null,
        selectedLevel: null,
        fields: [],
        levels: [],
        content: '',
        address: '',
    };

    private thresholdUpdate = new ReplaySubject<Threshold>();

    private alertUpdate = new ReplaySubject<Alert>();

    thresholdUpdate$ = this.thresholdUpdate.asObservable();

    alertUpdate$ = this.alertUpdate.asObservable();

    getThreshold() {
        return this.threshold;
    }

    getAlert() {
        return this.alert;
    }

    setThreshold(threshold: Threshold) {
        this.threshold = threshold;
    }

    setAlert(alert: Alert) {
        this.alert = alert;
    }

    onThresholdUpdate() {
        this.thresholdUpdate.next(this.threshold);
    }

    onAlertUpdate() {
        this.alertUpdate.next(this.alert);
    }
}

import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {
    AdministrativeUnitService,
    AdministrativeUnitsTreeResponse,
    AdministrativeUnitTree,
} from 'src/app/service/api/administrative-unit.service';
export interface AUCodes {
    wardCode: string;
    districtCode: string;
    provinceCode: string;
}
@Component({
    selector: 'app-au-tree-select',
    templateUrl: './au-tree-select.component.html',
    styleUrl: './au-tree-select.component.scss',
})
export class AuTreeSelectComponent {
    constructor(private auSerivce: AdministrativeUnitService) {}
    administrativeUnits: AdministrativeUnitTree[] = [];

    @Input() label: string = 'Đơn vị hành chính';

    @Input() placeholder: string = 'Chọn đơn vị hành chính';

    @Input() codes: AUCodes;

    @Input() showLabel: boolean = true;

    @Input() required: boolean = false;

    @Input() hasFilter: boolean = false;

    @Input() administrativeUnit: AdministrativeUnitTree;

    @Input() errorAdministrativeUnit: string = '';

    @Output() onChange: EventEmitter<AdministrativeUnitTree> =
        new EventEmitter();

    @Output() administrativeUnitChange: EventEmitter<AdministrativeUnitTree> =
        new EventEmitter();

    async ngOnInit() {
        await this.getAUs();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['codes'] && this.administrativeUnits.length > 0) {
            this.administrativeUnit = this.findAUByCodes(
                this.codes?.wardCode,
                this.codes?.districtCode,
                this.codes?.provinceCode,
            );
            this.administrativeUnitChange.emit(this.administrativeUnit);
        }
    }

    handleAUChange(data: AdministrativeUnitTree) {
        this.onChange.emit(data);
    }

    async getAUs() {
        try {
            const res: AdministrativeUnitsTreeResponse = await lastValueFrom(
                this.auSerivce.getAdministrativeUnitsTree(),
            );
            this.administrativeUnits = res.data;
            this.administrativeUnit = this.findAUByCodes(
                this.codes?.wardCode,
                this.codes?.districtCode,
                this.codes?.provinceCode,
            );
            this.administrativeUnitChange.emit(this.administrativeUnit);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    findAUByCodes(
        wardCode: string,
        districtCode: string,
        provinceCode: string,
    ) {
        let result: AdministrativeUnitTree;

        if (provinceCode) {
            result = this.administrativeUnits.find(
                (item: AdministrativeUnitTree) => item?.code === provinceCode,
            );
        }

        if (districtCode) {
            result = result?.children?.find(
                (item: AdministrativeUnitTree) => item?.code === districtCode,
            );
        }

        if (wardCode) {
            result = result?.children?.find(
                (item: AdministrativeUnitTree) => item?.code === wardCode,
            );
        }

        return result;
    }
}

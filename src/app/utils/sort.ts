import { HttpParams } from '@angular/common/http';
import { SortObject } from 'src/app/interface';

export function addSortToParams(
    currentParams: HttpParams,
    sortObject: SortObject,
) {
    if (sortObject && Object.keys(sortObject).length > 0) {
        return currentParams
            .set('orderBy', sortObject.orderBy)
            .set('orderDirection', sortObject.orderDirection);
    } else {
        return currentParams;
    }
}

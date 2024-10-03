import { RouterModule, Routes } from '@angular/router';
import { ListDocumentComponent } from './list-document/list-document.component';
import { SignDocumentComponent } from './sign-document/sign-document.component';

const routes: Routes = [
    {
        path: '',
        component: ListDocumentComponent,
        data: {
            breadcrumb: 'Danh sách tài liệu',
        },
    },
    {
        path: 'sign-document',
        component: SignDocumentComponent,
        data: {
            breadcrumb: 'Ký tài liệu',
        },
    },
];

export const DigitalSignatureRoutingModule = RouterModule.forChild(routes);

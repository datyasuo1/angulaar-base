import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDocumentComponent } from './list-document/list-document.component';
import { DigitalSignatureRoutingModule } from './digital-signature-routing.module';
import { DigitalSignatureComponent } from './digital-signature.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { SignDocumentComponent } from './sign-document/sign-document.component';
import { SignatureComponent } from './sign-document/signature/signature.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'primeng/api';
import { AddDocumentComponent } from './list-document/add-document/add-document.component';
import { ConfirmSigningComponent } from './sign-document/confirm-signing/confirm-signing.component';

@NgModule({
    declarations: [
        DigitalSignatureComponent,
        ListDocumentComponent,
        SignDocumentComponent,
        SignatureComponent,
        AddDocumentComponent,
        ConfirmSigningComponent,
    ],
    imports: [
        CommonModule,
        DigitalSignatureRoutingModule,
        CdkDrag,
        CdkDropList,
        ComponentsModule,
        SharedModule,
    ],
})
export class DigitalSignatureModule {}

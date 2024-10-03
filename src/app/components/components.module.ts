import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxColorsModule } from 'ngx-colors';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { AuTreeSelectComponent } from 'src/app/components/common/au-tree-select/au-tree-select.component';
import { DepartmentTreeSelectComponent } from 'src/app/components/common/department-tree-select/department-tree-select.component';
import { ContactPopupComponent } from 'src/app/components/contact-popup/contact-popup.component';
import { ButtonComponent } from 'src/app/components/core/button/button.component';
import { CalendarComponent } from 'src/app/components/core/calendar/calendar.component';
import { CardLayoutComponent } from 'src/app/components/core/card-layout/card-layout.component';
import { CardComponent } from 'src/app/components/core/card/card.component';
import { CascadeSelectComponent } from 'src/app/components/core/cascade-select/cascade-select.component';
import { ColorPickerComponent } from 'src/app/components/core/color-picker/color-picker.component';
import { DialogComponent } from 'src/app/components/core/dialog/dialog.component';
import { EditorComponent } from 'src/app/components/core/editor/editor.component';
import { FileComponent } from 'src/app/components/core/file/file.component';
import { ImageComponent } from 'src/app/components/core/image/image.component';
import { InputNumberComponent } from 'src/app/components/core/input-number/input-number.component';
import { InputComponent } from 'src/app/components/core/input/input.component';
import { LabelComponent } from 'src/app/components/core/label/label.component';
import { LazyTableComponent } from 'src/app/components/core/lazy-table/lazy-table.component';
import { MapComponent } from 'src/app/components/core/map/map.component';
import { MultiSelectComponent } from 'src/app/components/core/multi-select/multi-select.component';
import { PaginatorComponent } from 'src/app/components/core/paginator/paginator.component';
import { PasswordComponent } from 'src/app/components/core/password/password.component';
import { RadioButtonComponent } from 'src/app/components/core/radio-button/radio-button.component';
import { SelectComponent } from 'src/app/components/core/select/select.component';
import { SwitchComponent } from 'src/app/components/core/switch/switch.component';
import { TableauComponent } from 'src/app/components/core/tableau/tableau.component';
import { TextAreaComponent } from 'src/app/components/core/text-area/text-area.component';
import { TreeCheckboxComponent } from 'src/app/components/core/tree-checkbox/tree-checkbox.component';
import { TreeSelectComponent } from 'src/app/components/core/tree-select/tree-select.component';
import { ReactiveCheckboxComponent } from 'src/app/components/reactive-form-controls/reactive-checkbox/reactive-checkbox.component';
import { ReactiveInputNumberComponent } from 'src/app/components/reactive-form-controls/reactive-input-number/reactive-input-number.component';
import { ReactiveInputComponent } from 'src/app/components/reactive-form-controls/reactive-input/reactive-input.component';
import { ReactiveSelectComponent } from 'src/app/components/reactive-form-controls/reactive-select/reactive-select.component';
import { ReactiveTextAreaComponent } from 'src/app/components/reactive-form-controls/reactive-text-area/reactive-text-area.component';
import { TagComponent } from 'src/app/components/tag/tag.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoleMultiSelectComponent } from './common/role-multi-select/role-multi-select.component';
import { LoadingComponent } from './core/loading/loading.component';

@NgModule({
    declarations: [
        CardComponent,
        TableauComponent,
        InputComponent,
        SelectComponent,
        TextAreaComponent,
        CascadeSelectComponent,
        TreeSelectComponent,
        FileComponent,
        MultiSelectComponent,
        SwitchComponent,
        LazyTableComponent,
        ColorPickerComponent,
        RadioButtonComponent,
        CalendarComponent,
        PaginatorComponent,
        ButtonComponent,
        LabelComponent,
        MapComponent,
        ImageComponent,
        InputNumberComponent,
        CardLayoutComponent,
        TreeCheckboxComponent,
        EditorComponent,
        PasswordComponent,
        TagComponent,
        ContactPopupComponent,
        ReactiveInputComponent,
        ReactiveSelectComponent,
        ReactiveInputNumberComponent,
        DialogComponent,
        ReactiveTextAreaComponent,
        ReactiveCheckboxComponent,
        AuTreeSelectComponent,
        DepartmentTreeSelectComponent,
        RoleMultiSelectComponent,
        LoadingComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        InputTextareaModule,
        DropdownModule,
        CascadeSelectModule,
        TreeSelectModule,
        MultiSelectModule,
        InputSwitchModule,
        TableModule,
        ColorPickerModule,
        CalendarModule,
        PaginatorModule,
        TooltipModule,
        AutoCompleteModule,
        ImageModule,
        InputNumberModule,
        NgxColorsModule,
        DialogModule,
        EditorModule,
        PasswordModule,
        RadioButtonModule,
        SelectButtonModule,
        TagModule,
        SidebarModule,
        ListboxModule,
        TabViewModule,
        CheckboxModule,
        FileUploadModule,
        ConfirmDialogModule,
        TreeModule,
        DynamicDialogModule,
        SharedModule,
        AutoFocusModule,
        A11yModule,
    ],
    exports: [
        CardComponent,
        TableauComponent,
        InputComponent,
        SelectComponent,
        TextAreaComponent,
        CascadeSelectComponent,
        TreeSelectComponent,
        FileComponent,
        MultiSelectComponent,
        SwitchComponent,
        LazyTableComponent,
        ColorPickerComponent,
        CalendarComponent,
        PaginatorComponent,
        ButtonComponent,
        LabelComponent,
        MapComponent,
        ImageComponent,
        InputNumberComponent,
        CardLayoutComponent,
        TreeCheckboxComponent,
        EditorComponent,
        PasswordComponent,
        SelectButtonModule,
        SidebarModule,
        TabViewModule,
        ListboxModule,
        TagComponent,
        CheckboxModule,
        FileUploadModule,
        ConfirmDialogModule,
        ContactPopupComponent,
        RadioButtonComponent,
        TreeModule,
        TableModule,
        DialogModule,
        EditorModule,
        RadioButtonModule,
        DynamicDialogModule,
        ReactiveInputComponent,
        ReactiveSelectComponent,
        ReactiveInputNumberComponent,
        DialogComponent,
        ReactiveTextAreaComponent,
        ReactiveCheckboxComponent,
        AuTreeSelectComponent,
        DepartmentTreeSelectComponent,
        RoleMultiSelectComponent,
        LoadingComponent,
    ],
    providers: [DialogService],
})
export class ComponentsModule {}

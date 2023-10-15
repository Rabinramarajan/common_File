import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from './input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { FormDirectiveModule } from './form-directive/form-directive.module';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormPipeModule } from "./form-pipe/form-pipe.module";
import { InputTextModule } from 'primeng/inputtext';
import { DataControlComponent } from './data-control/data-control.component';
import { DataControlModule } from './data-control/data-control.module';
import { SelectControlComponent } from './select-control/select-control.component';

@NgModule({
    declarations: [
        InputControlComponent,
        SelectControlComponent,
    ],
    exports: [InputControlComponent,
        DataControlModule,
        FormsModule,
        SelectControlComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        FormsModule,
        MatRippleModule,
        DataControlModule,
        InputTextModule,
        MatSelectModule,
        FormDirectiveModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FormPipeModule
    ]
})
export class FormInputModule { }

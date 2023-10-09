import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken, NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataControlComponent } from './data-control.component';
import { AppSettingsService } from '../../service/app-settings/app-settings.service';
import { FormPipeModule } from "../form-pipe/form-pipe.module";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormDirectiveModule } from '../form-directive/form-directive.module';
import { Platform } from '@angular/cdk/platform';
import { CustomDateAdapter } from './custom-date-adapter';
import { CalendarModule } from 'primeng/calendar';

export const DATE_CONFIG = new InjectionToken("Date Format", {
  factory: () => {
    return {
      viewFormat: inject(AppSettingsService).environment.dateViewFormat,
    };
  },
});

export const MY_FORMATS = {
  parse: {
    dateInput: "dd-MM-yyyy HH:mm",
  },
  display: {
    dateInput: "dd MMM yyyy",
    monthYearLabel: "MMM yyyy",
    dateA11yLabel: "dd MMM yyyy",
    monthYearA11yLabel: "MMMM yyyy",
  },
};


@NgModule({
  declarations: [DataControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    MatIconModule,
    MatRippleModule,
    FormPipeModule,
    FormDirectiveModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  exports: [DataControlComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataControlModule { }

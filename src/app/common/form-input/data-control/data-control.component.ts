import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { FormInputControl } from '../form-input-control';
import { NgControl } from '@angular/forms';
import { AppSettingsService } from '../../service/app-settings/app-settings.service';
import { format, isMatch, parse, sub } from 'date-fns';

@Component({
  selector: 'app-data-control',
  templateUrl: './data-control.component.html',
  styleUrls: ['./data-control.component.scss']
})
export class DataControlComponent extends FormInputControl implements OnInit {

  xvalue: any = "";
  @Input() public returnFormat = "";
  @Input() public year: any = "";
  @Input() public dob = false;
  @Input() public showTimeNow = false;
  @Input() public showSecondsNow = false;
  @Input() public dateFormat = '';
  @Input() public showButton = false;

  // dateFormat: any = '';

  minDateNow: any = '';
  maxDateNow: any = '';
  @Input()
  set minDate(minDate: string) {
    debugger
    if (minDate !== '') {
      this.getDateFormat(minDate).then((parseDateFormat) => {
        this.minDateNow = parse(minDate, parseDateFormat, new Date());
      })
    } else {
      this.minDateNow = '';
    }
  }
  get minDate() {
    return this.minDateNow;
  }

  @Input()
  set maxDate(maxDate: string) {
    debugger
    if (maxDate !== '') {
      this.getDateFormat(maxDate).then((parseDateFormat) => {

        this.maxDateNow = parse(maxDate, parseDateFormat, new Date());
      })
    } else {
      this.maxDateNow = '';
    }
  }
  get maxDate() {
    return this.maxDateNow;
  }

  constructor(@Self() @Optional() public control: NgControl,
    public appSetting: AppSettingsService) {
    super();
    this.control && (this.control.valueAccessor = this);
  }


  getDateFormat(date: string): Promise<string> {
    debugger
    return new Promise((resolve) => {
      let dateFormat = this.appSetting.environment.serverDateFormat;
      let dateFormatWithTime = this.appSetting.environment.serverDateFormatWithTime;
      let parseDateFormat = this.appSetting.environment.serverDateFormatWithTime;
      if (isMatch(date, dateFormat)) {
        parseDateFormat = dateFormat;
      } else if (isMatch(date, dateFormatWithTime)) {
        parseDateFormat = dateFormatWithTime;
      }
      resolve(parseDateFormat);
    })
  }

  ngOnInit(): void {
    debugger
    console.log(this.year);

    this.setValidate(this.control);
    this.viewValueChange().subscribe(async (xvalue) => {
      if (xvalue) {
        if (this.value !== "") {
          debugger
          let parseDateFormat = await this.getDateFormat(this.value); 
          this.xvalue = parse(this.value, parseDateFormat, new Date());
          
        } else {
          this.xvalue = "";
        }
      }
    });

    const result = sub(new Date(), { years: 18 });
    // Yesterday Date
    result.setDate(result.getDate() - 1);
    setTimeout(() => {
      if (this.dob) {
        this.maxDateNow = format(result, 'yyyy-MM-dd');
      }
    }, 500);
  }

  dateSelected() {
    const returnFormat = this.returnFormat === ''
      ? this.appSetting.environment.serverDateFormatWithTime
      : this.returnFormat;
    const xdate = format(this.xvalue, returnFormat);
    if (xdate === 'Invalid date') {
      this.value = '';
    } else {
      this.value = xdate;
    }
  }

  onLocalClear() {
    this.xvalue = '';
    this.onClear();
  }
}

import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { AppSettingsService } from './common/service/app-settings/app-settings.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  dob = '10-10-2023';
  errorTrue = false;
  beginDate: any;

  constructor(public appSetting: AppSettingsService,
    private http: HttpClient) {

  }

  ngOnInit(): void {
    const myDate = new Date();
    this.beginDate = format(myDate, this.appSetting.environment.serverDateFormat);
    console.log(this.beginDate);

  }

  save(l: any) {
    debugger
    if (l.valid) {

    } else {
      this.errorTrue = true;
    }


  }

  setValue(value: any) {
    console.log(value, 'DOB');

  }

}

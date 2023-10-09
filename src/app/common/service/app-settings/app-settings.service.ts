import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  public environment: any = {
    applicationPath: '',
    baseAppPath: '',
    adminPath: '',
    imagePath: '',
    encrypt: false,
    maxFileSize3MB: 0,
    maxFileSize10MB: 0,
    fileSizeErrorMsg10MB: '',
    fileSizeErrorMsg3MB: '',
    fileAccept: '',
    fileAcceptPDF: '',
    serverDateFormat: "",
    serverDateFormatWithTime: "",
    dateViewFormat: "",
    dateViewFormatWithTime: "",
  };

  constructor(private http: HttpClient) { }
  loadConfig() {
    // console.log('call');

    let d = new Date();
    let n = d.getTime();
    return this.http
      .get('./app.settings.json?v=' + n)
      .toPromise()
      .then((success: any) => {
        this.environment = success;
        console.log(this.environment);
      });
  }
}

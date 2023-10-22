import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from '../common/service/app-settings/app-settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpClient,
    public appsettingService: AppSettingsService) {

  }

  ngOnInit(): void {
    debugger
    console.log('sdjhvjbhs');
    
    this.http.get(this.appsettingService.environment.applicationPath + 'api/student').subscribe((success: any) => {
      console.log(success);

    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { AuthResponse } from './models/AuthResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';
  greeting: any = {};

  constructor(private app: AppService) {

  }
  ngOnInit() {
    console.log('1.Authenticating on top level')
    this.app.authenticate(undefined, undefined).subscribe((auth: AuthResponse) => {
      if (auth) {
        console.log('2.Top level, auth ==', auth);
        console.log("3.Is authenticated ==", auth.authenticated);
        this.app.user = auth;
      }

    });
    
  }
  isAuthenticated() {
    console.log('4.After auth sub == ',this.app.user);
    return this.app.user?.authenticated;
  }

}

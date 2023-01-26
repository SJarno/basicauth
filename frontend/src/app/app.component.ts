import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';
  greeting: any = {};

  constructor(private http: HttpClient, private app: AppService, private router: Router) {

  }
  ngOnInit() {
    console.log('Authenticating on top level')
    this.app.authenticate(undefined, undefined).subscribe(auth => {
      console.log('Auth result on top level ==', auth);
    });
    console.log('After auth == ',this.app.user);
  }
  isAuthenticated() {
    return this.app.authenticated;
  }

}

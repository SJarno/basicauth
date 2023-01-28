import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Demo';
  greeting?: any;
  url: string = environment.baseUrl;
  constructor(private app: AppService, private http: HttpClient) { }

  ngOnInit(): void {
    //this.app.authenticate(undefined, undefined).subscribe();  
    console.log('Home == Is authenticated', this.isAuthenticated());
    this.http.get(`${this.url}resource`).subscribe(data => this.greeting = data);
 

  }
  isAuthenticated(): boolean | undefined {
    if (this.app.user) {
      return this.app.user?.authenticated;
    }
    return false;
    
  }

}

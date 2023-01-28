import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AppService, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    const logoutResult = this.authService.logout();
    console.log('Logout result == ', logoutResult);
    if (logoutResult) {
      this.router.navigateByUrl('/login');
    }
  }
  isAuthenticated() {
    return this.authService.user?.authenticated;
  }

}

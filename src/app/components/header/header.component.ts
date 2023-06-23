import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../scss/index.scss']
})
export class HeaderComponent {

  constructor(private http: HttpClient, private router: Router) {}

  logoutFarmhome () {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

}

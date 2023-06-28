import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../scss/index.scss']
})
export class HeaderComponent {

  avatar : any = localStorage.getItem('avatar')

  constructor(private http: HttpClient, private router: Router) {}

  logoutFarmhome () {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('avatar')
    this.router.navigate(['/login']);
  }

}

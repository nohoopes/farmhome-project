import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Farmhome';

  constructor(public  _router: Router, private http: HttpClient, private router: Router) { }
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken') === null) {
      this.router.navigate(['/login']);
      
    }
    else {
      this.router.navigate(['/home']);
    }
  }
 
}

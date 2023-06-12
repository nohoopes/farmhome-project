import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { History } from 'src/app/models/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class HistoryComponent implements OnInit {
  //declare
  loading: boolean = false;

  today: Date = new Date();

  history: History[] = [];

  baseApiUrl: string = 'https://farmhomebackend-production.up.railway.app';

  //Function
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get(this.baseApiUrl + '/history/user/' + 2)
      .subscribe((res: any) => {
        this.history = res.contents;
        console.log(this.history);
        this.loading = false;
      });
  }

  refreshBtn() {
    this.history = [];
    this.ngOnInit();
  }

  totalPrice(a: number, b: number) {
    let c: Number;
    c = a * b * 1000;
    return c;
  }
}

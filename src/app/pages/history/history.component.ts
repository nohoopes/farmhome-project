import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { History } from 'src/app/models/history';
import { DecimalPipe } from '@angular/common';

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
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get(this.baseApiUrl + '/history/user/' + localStorage.getItem('userId'))
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
    let c;
    c = a * b * 1000;
    c = this.formatNumber(c);
    return c;
  }

  formatNumber(numberToFormat: any) {
    if (numberToFormat !== null) {
      const decimalPipe = new DecimalPipe('en-US');
      return decimalPipe.transform(numberToFormat, '1.0-0');
    }
    else {
      return ''; 
    }
  }
}

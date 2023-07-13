import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class OverviewComponent {
  //declare
  loading: boolean = false;

  today: Date = new Date();

  history: History[] = [];

  products: Product[] = [];

  baseApiUrl: string = 'https://farmhomebackend-production.up.railway.app';

  totalPd: any = 0;

  totalOd: any = 0;

  totalICd: any = 0;

  //Function
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get(this.baseApiUrl + '/history/user/' + localStorage.getItem('userId'))
      .subscribe((res: any) => {
        this.history = res.contents;
        for (let i = 0; i < res.contents.length; i++) {
          if (res.contents[i].status.name === 'Completed') {
            this.totalOd = this.totalOd + 1;
            this.totalICd =
              this.totalICd +
              this.totalPrice(res.contents[i].price, res.contents[i].amount);
          }
        }
        console.log(this.history);
        this.loading= false;
      });
    this.http
      .get(
        this.baseApiUrl +
          '/fruit/farmer/' +
          localStorage.getItem('userId') +
          '?no=0&limit=100'
      )
      .subscribe((res: any) => {
        this.products = res.contents.reverse();
        this.totalPd = this.products.length;
        console.log(this.products);
        this.loading= false;
      });
  }

  refreshBtn() {
    this.history = [];
    this.products = [];
    this.ngOnInit();

    this.totalPd = 0;

    this.totalOd = 0;

    this.totalICd = 0;
  }

  totalPrice(a: number, b: number) {
    let c;
    c = a * b * 1000;
    return c;
  }
  formatNumber(numberToFormat: any) {
    if (numberToFormat !== null) {
      const decimalPipe = new DecimalPipe('en-US');
      return decimalPipe.transform(numberToFormat, '1.0-0');
    } else {
      return '';
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/orders';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class OrderComponent implements OnInit {
  //Declare
  baseApiUrl: string = 'https://backendfarmhome-production.up.railway.app';

  size: any;

  orders: Order[] = [];

  sg_prices: number[] = [];

  today: Date = new Date();

  loading: boolean = false;
  
  panelOpenState = false;

  //Function
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get(this.baseApiUrl + '/order/farmer/' + 2)
      .subscribe((res: any) => {
        this.orders = res.contents;
        this.size = res.contents.length;
        console.log(this.orders);
        this.loading = false;
      });
  }
}

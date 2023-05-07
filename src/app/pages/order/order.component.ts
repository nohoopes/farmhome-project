import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
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

  discussForm: FormGroup | undefined;

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

  acceptOrder(id: string) {
    let confirmAction = confirm('Accept this order?');
    if (confirmAction) {
      this.loading = true;
      this.http.post(this.baseApiUrl + '/order/accept/' + id, {}).subscribe({
        next: (response) => {
          this.router.navigate(['order']);
          alert('Accept successfully!');
          this.loading = false;
          this.ngOnInit();
        },
        error: (orders) => {
          console.log(orders);
          alert('Something went wrong! Please try again later 😢');
        },
      });
    } else {
      alert('Action canceled');
    }
  }

  deleteOrder(id: string, reason: string) {
    let confirmAction = confirm('Are you sure to decline this order?');
    if (confirmAction) {
      this.loading = true;
      this.http
        .delete(
          this.baseApiUrl + '/order/cancel/' + id + '?reason=' + reason,
          {}
        )
        .subscribe({
          next: (response) => {
            this.router.navigate(['order']);
            alert('Decline successfully!');
            this.loading = false;
            this.ngOnInit();
          },
          error: (orders) => {
            console.log(orders);
            alert('Something went wrong! Please try again later 😢');
          },
        });
    } else {
      alert('Action canceled');
    }
  }

  discussOrder(id: string, dealPrice: string, dealAmount: string) {
    this.loading = true;
    this.discussForm = new FormGroup({
      id:  new FormControl (id) ,
      dealPrice: new FormControl (dealPrice),
      dealAmount: new FormControl (dealAmount),
    })
 
    let confirmAction = confirm('Are you sure you are satisfied with what you want to change?');
    if (confirmAction) {
      this.http
        .put(this.baseApiUrl + '/order/suggest/', this.discussForm.getRawValue())
        .pipe(
          tap({
            next: (response: any) => {
              console.log(response);
              this.loading = false;
              alert(
                'The new discussion is successful. Please wait for the merchant!'
              );
              this.ngOnInit();
            },
            error: (error: any) => {
              console.log(error);
              alert('Something went wrong! Please try again later 😢');
            },
          })
        )
        .subscribe();
    } else {
      alert('Action canceled');
    }
  }
}

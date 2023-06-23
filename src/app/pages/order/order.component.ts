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
  baseApiUrl: string = 'https://farmhomebackend-production.up.railway.app';

  size: any;

  orders: Order[] = [];

  today: Date = new Date();

  loading: boolean = false;

  loading2: boolean = false;

  panelOpenState = false;

  discussForm: FormGroup | undefined;

  //Function
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get(this.baseApiUrl + '/order/farmer/' + localStorage.getItem('userId'))
      .subscribe((res: any) => {
        this.orders = res.contents;
        this.size = res.contents.length;
        console.log(this.orders);
        this.loading = false;
      });
  }

  refreshBtn() {
    this.orders = [];
    this.ngOnInit();
  }

  acceptOrder(id: string) {
    this.loading2 = true;
    this.http.post(this.baseApiUrl + '/order/accept/' + id, {}).subscribe({
      next: (response) => {
        alert('Accept successfully!');
        this.loading2 = false;
        this.refreshBtn();
      },
      error: (orders) => {
        console.log(orders);
        alert('Something went wrong! Please try again later 😢');
      },
    });
  }

  deleteOrder(id: string, reason: string) {
    let confirmAction = confirm('Are you sure to decline this order?');
    if (confirmAction) {
      this.loading2 = true;
      this.http
        .delete(
          this.baseApiUrl + '/order/cancel/' + id + '?reason=' + reason,
          {}
        )
        .subscribe({
          next: (response) => {
            this.router.navigate(['order']);
            alert('Decline successfully!');
            this.loading2 = false;
            this.refreshBtn();
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
    this.loading2 = true;
    this.discussForm = new FormGroup({
      id: new FormControl(id),
      dealPrice: new FormControl(dealPrice),
      dealAmount: new FormControl(dealAmount),
    });

    let confirmAction = confirm(
      'Are you sure you are satisfied with what you want to change?'
    );
    if (confirmAction) {
      this.http
        .put(
          this.baseApiUrl + '/order/suggest/',
          this.discussForm.getRawValue()
        )
        .pipe(
          tap({
            next: (response: any) => {
              console.log(response);
              this.loading2 = false;
              alert(
                'The new discussion is successful. Please wait for the merchant!'
              );
              this.refreshBtn();
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

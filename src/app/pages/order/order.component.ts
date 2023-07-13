import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
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

  inputDate: string = '';

  convertedDate: string = '';

  loading: boolean = false;

  loading2: boolean = false;

  panelOpenState = false;

  discussForm: FormGroup | undefined;

  acceptForm: FormGroup | undefined;

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
    this.inputDate = '';
    this.ngOnInit();
  }

  convert() {
    const date = new Date(this.inputDate);
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());

    this.convertedDate = `${year}-${month}-${day}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
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

  acceptOrder(id: string, deliveryDate: string) {
    if (deliveryDate != '') {
      this.acceptForm = new FormGroup({
        deliveryDate: new FormControl(deliveryDate),
      });
      this.loading = true;
      this.http
        .post(
          this.baseApiUrl + '/order/accept/' + id,
          this.acceptForm.getRawValue()
        )
        .subscribe({
          next: (response) => {
            alert('Accept successfully!');
            this.loading = false;
            this.refreshBtn();
          },
          error: (error:any) => {
            alert(error.message);
            this.refreshBtn();
          },
        });
    } else {
      this.loading = true;
      this.http.post(this.baseApiUrl + '/order/accept/' + id, {}).subscribe({
        next: (response) => {
          alert('Accept successfully!');
          this.loading = false;
          this.refreshBtn();
        },
        error: (error: any) => {
          alert(error.message);
          this.refreshBtn();
        },
      });
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
            this.refreshBtn();
          },
          error: (error:any) => {
            alert(error);
            this.refreshBtn();
          },
        });
    } else {
      alert('Action canceled');
    }
  }

  discussOrder(id: string, dealPrice: string, dealAmount: string) {
    this.loading = true;
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
              this.loading = false;
              alert(
                'The new discussion is successful. Please wait for the merchant!'
              );
              this.refreshBtn();
            },
            error: (error: any) => {
              console.log(error);
              alert(error);
              this.refreshBtn();
            },
          })
        )
        .subscribe();
    } else {
      alert('Action canceled');
    }
  }
}

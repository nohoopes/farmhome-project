import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProductDialogComponent } from 'src/app/components/add-product-dialog/add-product-dialog.component';
import { Product } from 'src/app/models/products';

@Component({
  selector: 'app-agricutural-product',
  templateUrl: './agricutural-product.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class AgricuturalProductComponent implements OnInit {
  baseApiUrl: string = 'https://backendfarmhome-production.up.railway.app';

  size: any;

  products: Product[] = [];

  sg_prices: number[] = [];

  today: Date = new Date();

  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get(this.baseApiUrl + '/fruit/farmer/' + 9 + '?no=0&limit=100')
      .subscribe((res: any) => {
        this.products = res.contents;
        this.size = res.contents.length;
        console.log(this.products);
        this.loading = false;
      });
  }

  openAddProductDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog.open(AddProductDialogComponent, dialogConfig);
  }
}

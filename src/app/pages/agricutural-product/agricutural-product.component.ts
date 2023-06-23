import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AddProductDialogComponent } from 'src/app/components/add-product-dialog/add-product-dialog.component';
import { Product } from 'src/app/models/products';

@Component({
  selector: 'app-agricutural-product',
  templateUrl: './agricutural-product.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class AgricuturalProductComponent implements OnInit {
  baseApiUrl: string = 'https://farmhomebackend-production.up.railway.app';

  size: any;

  products: Product[] = [];

  sg_prices: number[] = [];

  today: Date = new Date();

  loading: boolean = false;

  loading2: boolean = false;

  panelOpenState = false;

  imageUrl: string = '';

  selectedFile!: File;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.http
      .get(this.baseApiUrl + '/fruit/farmer/' + localStorage.getItem('userId') + '?no=0&limit=100')
      .subscribe((res: any) => {
        this.products = res.contents;
        this.size = res.contents.length;
        console.log(this.products);
        this.loading = false;
      });
  }

  refreshBtn() {
    this.products = [];
    this.imageUrl = '';
    this.ngOnInit();
  }

  openAddProductDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AddProductDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshBtn();
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }

  formatDate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [year, month, day].join('-');
  }

  translateCategory(category: string) {
    var cate: string = '';
    if (category == 'Trái cây') {
      cate = 'Fruit';
    }
    if (category == 'Rau xanh') {
      cate = 'Vegetables';
    }
    if (category == 'Rau củ') {
      cate = 'Tubers';
    }
    if (category == 'Đậu') {
      cate = 'Beans';
    }
    if (category == 'Gia vị') {
      cate = 'Spices';
    }
    return cate;
  }

  updateProduct(
    id: string,
    weight: string,
    name: string,
    season: string,
    description: string,
    category: string
  ) {
    var formData: any = new FormData();
    if (this.imageUrl != '') {
      formData.append('images', this.selectedFile, this.selectedFile.name);
    }
    formData.append(
      'fruit',
      JSON.stringify({
        id: id,
        weight: weight,
        name: name,
        unit: 'kg',
        date: this.formatDate(),
        season: season,
        description: description,
        popular: true,
        category: category,
      })
    );
    console.log(formData);
    this.loading2 = true;
    this.http
      .put(this.baseApiUrl + '/admin/fruit/update', formData)
      .pipe(
        tap({
          next: (response: any) => {
            console.log(response);
            alert('Update the agricultural product successfully!');
            this.refreshBtn();
            this.loading2 = false;
          },
          error: (error: any) => {
            console.log(error);
            alert('Something went wrong! Please try again later 😢');
          },
        })
      )
      .subscribe();
  }

  deleteProduct(id: string) {
    let confirmAction = confirm('Are you sure to delete this?');
    if (confirmAction) {
      this.loading2 = true;
      this.http.delete(this.baseApiUrl + '/fruit/delete/' + id).subscribe({
        next: (response) => {
          alert('Delete successfully! 😀');
          this.loading2 = false;
          this.refreshBtn();
        },
        error: (products) => {
          console.log(products);
          alert('Something went wrong! Please try again later 😢');
          this.loading2 = false;
        },
      });
    } else {
      alert('Action canceled');
    }
  }
}

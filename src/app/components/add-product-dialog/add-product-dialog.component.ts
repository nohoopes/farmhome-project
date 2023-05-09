import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AgricuturalProductComponent } from 'src/app/pages/agricutural-product/agricutural-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class AddProductDialogComponent implements OnInit {
  //declare

  baseApiUrl: string = 'https://backendfarmhome-production.up.railway.app';

  today: Date = new Date();

  imageUrl: string = '../../../assets/fruit_example.png';

  selectedFile!: File;

  loading: boolean = false;

  form: FormGroup;

  name: any;
  weight: any;
  unit: any;
  date: any;
  description: any;
  season: any;

  //function

  ngOnInit(): void {
    this;
  }

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.fb.group({});
  }

  formatDate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [year, month, day].join('-');
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }

  addProduct() {
    this.loading = true;
    var formData: any = new FormData();
    formData.append('images', this.selectedFile, this.selectedFile.name);
    formData.append(
      'fruit',
      JSON.stringify({
        name: this.name,
        weight: this.weight,
        unit: 'kg',
        date: this.formatDate(),
        season: this.season,
        farmer: {
          id: 2,
        },
        description: this.description,
      })
    );
    console.log(formData);
    this.http
      .post(this.baseApiUrl + '/admin/fruit/create', formData)
      .pipe(
        tap({
          next: (response: any) => {
            console.log(response);
            this.loading = false;
            alert('Add new agricultural product successfully. Please press Refresh button to reload latest updates!');
            this.dialog.closeAll();
          },
          error: (error: any) => {
            console.log(error);
            alert('Something went wrong! Please try again later 😢');
          },
        })
      )
      .subscribe();
  }

  //get event
  changeName(e: any) {
    this.name = e;
  }
  changeWeight(e: any) {
    this.weight = e * 1;
  }
  changeSeason(e: any) {
    this.season = e;
  }
  changeDescription(e: any) {
    this.description = e;
  }
}

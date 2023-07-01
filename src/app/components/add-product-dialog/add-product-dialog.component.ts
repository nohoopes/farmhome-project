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

  baseApiUrl: string = 'https://farmhomebackend-production.up.railway.app';

  today: Date = new Date();

  imageUrl: string = '../../../assets/fruit_example.png';

  selectedFile!: File;

  loading: boolean = false;

  form: FormGroup;

  season: any;
  category: any;

  p_product: any;
  p_confidence: any;
  p_season: any;
  p_category: any;

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

  addProduct(
    name: any,
    weight: any,
    description: any,
    season: any,
    category: any
  ) {
    this.loading = true;
    var formData: any = new FormData();
    formData.append('images', this.selectedFile, this.selectedFile.name);
    formData.append(
      'fruit',
      JSON.stringify({
        name: name,
        weight: weight,
        unit: 'kg',
        date: this.formatDate(),
        category: category,
        season: season,
        farmer: {
          id: localStorage.getItem('userId'),
        },
        description: description,
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
            this.dialog.closeAll();
          },
          error: (error: any) => {
            console.log(error);
            alert(error.message);
          },
        })
      )
      .subscribe();
  }

  predictForm() {
    var formData: any = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    console.log(formData);
    this.http
      .post(
        'https://fruit-vegetable-detect-production.up.railway.app/detect',
        formData
      )
      .pipe(
        tap({
          next: (response: any) => {
            this.p_product = `${response[0].fruit}`;
            this.p_season = this.getSeason(this.p_product);
            this.p_category = this.getCategory(this.p_product);
            this.p_product = this.changeName2VNese(this.p_product);
            this.p_confidence = `${response[0].confidence}`;
            this.p_confidence = this.p_confidence * 100;
            console.log(this.p_product);
            console.log(this.p_category);
            console.log(this.p_season);
          },
          error: (error) => {
            console.log(error);
            alert(
              'Something went wrong! Please check the input or try again later 😢'
            );
          },
        })
      )
      .subscribe();
  }

  changeSeason(e: any) {
    this.season = e;
  }
  changeCategory(e: any) {
    this.category = e;
  }

  changeName2VNese(name: any) {
    var name2VNese: string = '';
    //0
    if (name == 'apple') {
      name2VNese = 'Táo';
    }
    //1
    if (name == 'banana') {
      name2VNese = 'Chuối';
    }
    //2
    if (name == 'beetroot') {
      name2VNese = 'Củ dền';
    }
    //3
    if (name == 'bell pepper') {
      name2VNese = 'Ớt chuông';
    }
    //4
    if (name == 'cabbage') {
      name2VNese = 'Bắp cải';
    }
    //5
    if (name == 'capsicum') {
      name2VNese = 'Ớt chuông';
    }
    //6
    if (name == 'carrot') {
      name2VNese = 'Củ cải đỏ';
    }
    //7
    if (name == 'cauliflower') {
      name2VNese = 'Bông cải';
    }
    //8
    if (name == 'chilli pepper') {
      name2VNese = 'Ớt';
    }
    //9
    if (name == 'corn') {
      name2VNese = 'Bắp';
    }
    //10
    if (name == 'cucumber') {
      name2VNese = 'Dưa chuột';
    }
    //11
    if (name == 'eggplant') {
      name2VNese = 'Cà tím';
    }
    //12
    if (name == 'garlic') {
      name2VNese = 'Tỏi';
    }
    //13
    if (name == 'ginger') {
      name2VNese = 'Gừng';
    }
    //14
    if (name == 'grapes') {
      name2VNese = 'Nho';
    }
    //15
    if (name == 'jalepeno') {
      name2VNese = 'Ớt Jalepeno';
    }
    //16
    if (name == 'kiwi') {
      name2VNese = 'Kiwi';
    }
    //17
    if (name == 'lemon') {
      name2VNese = 'Chanh';
    }
    //18
    if (name == 'lettuce') {
      name2VNese = 'Rau xà lách';
    }
    //19
    if (name == 'mango') {
      name2VNese = 'Xoài';
    }
    //20
    if (name == 'onion') {
      name2VNese = 'Củ hành';
    }
    //21
    if (name == 'orange') {
      name2VNese = 'Cam';
    }
    //22
    if (name == 'paprika') {
      name2VNese = 'Ớt cựa gà';
    }
    //23
    if (name == 'pear') {
      name2VNese = 'Lê';
    }
    //24
    if (name == 'peas') {
      name2VNese = 'Đậu hà lan';
    }
    //25
    if (name == 'pineapple') {
      name2VNese = 'Dứa';
    }
    //26
    if (name == 'pomegranate') {
      name2VNese = 'Lựu';
    }
    //27
    if (name == 'potato') {
      name2VNese = 'Khoai tây';
    }
    //28
    if (name == 'raddish') {
      name2VNese = 'Củ cải';
    }
    //29
    if (name == 'soy beans') {
      name2VNese = 'Đậu nành';
    }
    //30
    if (name == 'spinach') {
      name2VNese = 'Rau chân vịt';
    }
    //31
    if (name == 'sweetcorn') {
      name2VNese = 'Bắp ngọt';
    }
    //32
    if (name == 'sweetpotato') {
      name2VNese = 'Khoai lang';
    }
    //33
    if (name == 'tomato') {
      name2VNese = 'Cà chua';
    }
    //34
    if (name == 'turnip') {
      name2VNese = 'Củ cải Turnip';
    }
    //35
    if (name == 'watermelon') {
      name2VNese = 'Dưa hấu';
    }

    return name2VNese;
  }

  getSeason(name: any) {
    var ss: string = '';
    if (
      name == 'grapes' ||
      name == 'pomegranate' ||
      name == 'banana' ||
      name == 'carrot' ||
      name == 'garlic' ||
      name == 'onion' ||
      name == 'pineapple' ||
      name == 'orange' ||
      name == 'capsicum'
    ) {
      ss = 'Spring';
    }
    if (
      name == 'jalepeno' ||
      name == 'paprika' ||
      name == 'watermelon' ||
      name == 'raddish' ||
      name == 'lettuce' ||
      name == 'spinach' ||
      name == 'tomato' ||
      name == 'sweetpotato' ||
      name == 'cauliflower'
    ) {
      ss = 'Summer';
    }
    if (
      name == 'bell pepper' ||
      name == 'peas' ||
      name == 'lemon' ||
      name == 'kiwi' ||
      name == 'chilli pepper' ||
      name == 'cabbage' ||
      name == 'turnip' ||
      name == 'eggplant' ||
      name == 'potato'
    ) {
      ss = 'Autumn';
    }
    if (
      name == 'soy beans' ||
      name == 'pear' ||
      name == 'mango' ||
      name == 'beetroot' ||
      name == 'sweetcorn' ||
      name == 'cucumber' ||
      name == 'corn' ||
      name == 'apple' ||
      name == 'ginger'
    ) {
      ss = 'Winter';
    }
    return ss;
  }

  getCategory(name: any) {
    var ct: string = '';
    if (
      name == 'apple' ||
      name == 'banana' ||
      name == 'corn' ||
      name == 'eggplant' ||
      name == 'cucumber' ||
      name == 'grapes' ||
      name == 'kiwi' ||
      name == 'lemon' ||
      name == 'mango' ||
      name == 'orange' ||
      name == 'pear' ||
      name == 'pineapple' ||
      name == 'pomegranate' ||
      name == 'sweetcorn' ||
      name == 'tomato' ||
      name == 'watermelon'
    ) {
      ct = 'Trái cây';
    }
    if (
      name == 'cabbage' ||
      name == 'cauliflower' ||
      name == 'lettuce' ||
      name == 'spinach'
    ) {
      ct = 'Rau xanh';
    }
    if (
      name == 'beetroot' ||
      name == 'carrot' ||
      name == 'potato' ||
      name == 'raddish' ||
      name == 'sweetpotato' ||
      name == 'turnip'
    ) {
      ct = 'Rau củ';
    }
    if (name == 'peas' || name == 'soy beans') {
      ct = 'Đậu';
    }
    if (
      name == 'garlic' ||
      name == 'ginger' ||
      name == 'bell pepper' ||
      name == 'capsicum' ||
      name == 'chilli pepper' ||
      name == 'jalepeno' ||
      name == 'onion' ||
      name == 'paprika'
    ) {
      ct = 'Gia vị';
    }
    return ct;
  }
}

import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { places } from 'src/app/models/places';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class ProfileComponent implements OnInit {
  //declare

  imageUrl: string = '../../../assets/fruit_example.png';

  selectedFile!: File;

  baseApiUrl: string = 'https://farmhomebackend-production.up.railway.app';

  user = User;

  loading: boolean = false;

  formattedDate: string ='';

  places = places;
  provinces!: any[];
  districts!: any[];
  wards!: any[];

  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;

  id: number = 0;
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  birthDay: string = '';
  address: any = '';
  ward: any = '';
  district: any = '';
  province: any = '';
  phone: string = '';
  email: string = '';
  avatar: string = '';
  status: any = '';

  //function

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.provinces = this.places.map((place) => ({
      province: place.province,
      province_code: place.province_code,
    }));

    this.loading = true;
    this.http.get(this.baseApiUrl + '/user/id/' + localStorage.getItem('userId')).subscribe((res: any) => {
      this.user = res;
      this.id = res.id;
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.email = res.email;
      this.phone = res.phone;
      this.birthDay = res.birthDay;
      this.avatar = res.avatar;
      this.status = res.status.name;
      this.username = res.username;
      this.address = res.location.address;
      this.ward = res.location.ward.name;
      this.district = res.location.ward.district.name;
      this.province = res.location.ward.district.province.name;
      this.loading = false;
    });
  }

  onProvinceChange() {
    this.districts =
      this.places.find((place) => place.province_code === this.selectedProvince)
        ?.districts || [];
    this.selectedDistrict = null;
    this.selectedWard = null;
  }

  onDistrictChange() {
    this.wards =
      this.districts.find(
        (district) => district.district_code === this.selectedDistrict
      )?.wards || [];
    this.selectedWard = null;
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }

  formatDate(): void {
    const date = new Date(this.formattedDate);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    this.formattedDate = `${year}/${month}/${day}`;
  }

  updateUser(fname: string, lname: string, bdate: string, email: string, phone: string, address: string, ward: string) {
    this.loading = true;
    var formData: any = new FormData();
    if (this.imageUrl != '') {
      formData.append('avatar', this.selectedFile, this.selectedFile.name);
    }
    formData.append(
      'user',
      JSON.stringify({
          id: localStorage.getItem('userId'),
          firstName: fname,
          lastName: lname,
          birthDay: bdate,
          email: email,
          phone: phone,
          status: {
              id: 1
          },
          location: {
              address: address,
              ward: { 
                  id: ward,
              }
          }
      
      })
    );
    this.http
      .put(this.baseApiUrl + '/admin/user/update', formData)
      .pipe(
        tap({
          next: (response: any) => {
            console.log(response);
            this.imageUrl = '../../../assets/fruit_example.png';
            alert("Update successfully");
            this.ngOnInit();
          },
          error: (error: any) => {
            console.log(error);
            alert(error.message);
          },
        })
      )
      .subscribe();
  }
}

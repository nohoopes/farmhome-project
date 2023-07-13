import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { places } from 'src/app/models/places';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class LoginComponent implements OnInit {
  //declare

  imageUrl: string = '../../../assets/fruit_example.png';

  selectedFile!: File;

  baseApiUrl: string = 'https://farmhomebackend-production.up.railway.app';

  user = User;

  loading: boolean = false;

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

  loginForm: FormGroup | undefined;

  //function
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loading = false;
    this.provinces = this.places.map((place) => ({
      province: place.province,
      province_code: place.province_code,
    }));
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

  loginFarmhome(username: string, password: string) {
    this.loading = true;
    this.loginForm = new FormGroup({
      username: new FormControl(username),
      password: new FormControl(password),
    });
    this.http
      .post(this.baseApiUrl + '/signin', this.loginForm.getRawValue())
      .pipe(
        tap({
          next: (response: any) => {
            console.log(response);
            const accessToken = response.accessToken;
            const userId = response.idUser;
            const avatar = response.avatar;
        
            // Save AccessToken and UserID to Local Storage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userId', userId);
            localStorage.setItem('avatar', avatar);
            this.loading = false;
            this.router.navigate(['/home']);
          },
          error: (error: any) => {
            console.log(error);
            alert(error.error.message);
            this.ngOnInit();
          },
        })
      )
      .subscribe();
  }

  registerFarmhome(
    username: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    birthDay: string,
    email: string,
    phone: string,
    address: string,
    ward: string,
  ) {
    var formData: any = new FormData();
    if (this.selectedFile != null) {
      formData.append('avatar', this.selectedFile, this.selectedFile.name);
    }
    formData.append(
      'user',
      JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastName,
        birthDay: birthDay,
        email: email,
        phone: phone,
        status: {
            id: 1
        },
        location: {
            address: address,
            ward: { 
                id: ward
            }
        }
      })
    );
    this.loading = true;
    this.http
      .post(this.baseApiUrl + '/admin/user/createFarmer', formData)
      .pipe(
        tap({
          next: (response: any) => {
            console.log(response);
            alert('Sign up successfully! Please login and enjoy!!!');
            this.loading = false;
            this.loginFarmhome(username, password);
          },
          error: (error: any) => {
            console.log(error);
            alert(JSON.stringify(error.error));
            this.ngOnInit();
          },
        })
      )
      .subscribe();
  }
}

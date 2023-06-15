import { Component, OnInit } from '@angular/core';
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

  //function
  ngOnInit(): void {
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
}

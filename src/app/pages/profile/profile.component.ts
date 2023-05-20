import { Component, OnInit } from '@angular/core';
import { places } from 'src/app/models/places';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class ProfileComponent implements OnInit{

  imageUrl: string = '../../../assets/fruit_example.png';
  
  selectedFile!: File;

  places = places;
  provinces!: any[];
  districts!: any[];
  wards!: any[];

  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;

  ngOnInit() {
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

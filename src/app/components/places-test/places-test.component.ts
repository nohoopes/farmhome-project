import { Component, OnInit } from '@angular/core';
import { places } from 'src/app/models/places';

@Component({
  selector: 'app-places-test',
  templateUrl: './places-test.component.html',
  styleUrls: ['./places-test.component.scss'],
})
export class PlacesTestComponent implements OnInit {
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
}

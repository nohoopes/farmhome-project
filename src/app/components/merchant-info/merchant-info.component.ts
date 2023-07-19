import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['../../scss/index.scss'],
})
export class MerchantInfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) { }
}

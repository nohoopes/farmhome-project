import { Component } from '@angular/core';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['../../scss/index.scss']
})
export class AddProductDialogComponent {

  today: Date = new Date();

  imageUrl: string = "../../../assets/fruit_example.png";

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
    }
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  images: string[] = [];
  selectedImage: string | null = null;

  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    }
  }

  uploadImages() {
    const formData = new FormData();
    for (const image of this.images) {
      const blob = this.dataURItoBlob(image);
      formData.append('images[]', blob);
    }

    // Now you can use this 'formData' to send to the server or perform any other action.
    // For example, you can use Angular's HttpClient to send the form data to the server.
  }

  showImage(image: string) {
    this.selectedImage = image;
  }

  closeModal() {
    this.selectedImage = null;
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

}

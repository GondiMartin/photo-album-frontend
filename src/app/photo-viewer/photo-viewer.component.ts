import { Component, OnInit } from '@angular/core';
import { MyPhotosService } from '../services/my-photos.service';
import { UserService } from '../services/user-service';
import { Image } from '../models/image';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css']
})
export class PhotoViewerComponent implements OnInit{
  
  images: Image[] = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
  newImage: Image = new Image();
  selectedFile: string = "";

  ngOnInit(): void {
    
  }

  constructor(
    private userService: UserService,
    private myPhotosService: MyPhotosService
  ) {
    if (this.userService.isLoggedIn()) {
      this.loadImages();
    }
  }
  
  loadImages() {
    this.myPhotosService.getAll().subscribe(images => {
      this.images = images.map(imageData => {
        let image = Object.assign(new Image(), imageData);
        image.imgSrc = image.getImageSrc();
        return image;
      });
    });
  }

  sendForm() {
    const json = sessionStorage.getItem("current-user");
    if (json != null) {
      this.myPhotosService.create(this.newImage).subscribe(newImage => {
        this.selectedFile = '';
        let np: Image = Image.convertNewImage(newImage);
        this.images.unshift(np);
        this.ngOnInit();
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const arrayBuffer: ArrayBuffer = e.target.result;
        const byteArray = new Uint8Array(arrayBuffer);
        this.newImage.image = Array.from(byteArray);
      };

      reader.readAsArrayBuffer(file);
    }
  }

  onFileNameChanged(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file.name;
    }
  }

}

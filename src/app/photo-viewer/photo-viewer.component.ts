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
  reverse: boolean = false;
  sortBy = "";

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
    const userId = sessionStorage.getItem("current-user-id");
    if (userId != null) {
      this.myPhotosService.getAll(Number.parseInt(userId)).subscribe(images => {
        this.images = images.map(imageData => {
          let image = Object.assign(new Image(), imageData);
          image.imgSrc = image.getImageSrc();
          return image;
        });
      });
    }
  }

  sendForm() {
    const userId = sessionStorage.getItem("current-user-id");
    if (userId != null && this.selectedFile !== '' && this.newImage.image != null) {
      this.newImage.name = this.selectedFile;
      this.newImage.userId = Number.parseInt(userId);
      this.myPhotosService.upload(this.newImage).subscribe(newImage => {
        this.selectedFile = '';
        this.newImage = new Image();
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

  delete(image: Image) {
    this.myPhotosService.delete(image.id).subscribe(_ => {
      const index = this.images.findIndex(i => i.id === image.id);
      this.images.splice(index, 1);
      this.ngOnInit();
    });
  }

  sortByName() {
    this.images.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return this.reverse ? 1 : -1;
      if (nameA > nameB) return this.reverse ? -1 : 1;
      return 0;
    });
    this.reverse = !this.reverse;
  }
  
  sortByDate() {
    this.images.sort((a, b) => {
      const dateA = new Date(a.uploadDate);
      const dateB = new Date(b.uploadDate);
      if (dateA < dateB) return this.reverse ? 1 : -1;
      if (dateA > dateB) return this.reverse ? -1 : 1;
      return 0;
    });
    this.reverse = !this.reverse;
  }

}

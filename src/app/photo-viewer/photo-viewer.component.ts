import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../services/user-service";

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css']
})
export class PhotoViewerComponent implements OnInit{
  user: User = new User();

  constructor(
      private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const userId: string = JSON.parse(sessionStorage.getItem('current-user-id') || '');
    this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
    })
  }


}

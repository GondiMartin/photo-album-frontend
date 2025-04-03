import { Component } from '@angular/core';
import {UserService} from "./services/user-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world-app';

  constructor(
      public userService: UserService
  ){}

  logout(): void {
    this.userService.logout();
  }

}

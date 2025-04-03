import { Component } from '@angular/core';
import {UserService} from "../services/user-service";
import {Router} from "@angular/router";
import {RegisterUser} from "../models/register-user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: RegisterUser = new RegisterUser();

  constructor(
      private userService: UserService,
      private router: Router
  ){}

  logInUser(){
    this.userService.login(this.user).subscribe((response) => {
      const tokenJson = JSON.stringify(response.token);
      sessionStorage.setItem('current-user-token', tokenJson);
      sessionStorage.setItem('current-user-id', JSON.stringify(response.id))
      this.goToMainPage();
    });
  }

  goToMainPage(){
    this.router.navigate(['/myphotos']);
  }

  isValidEmail(): boolean{
    let email: string = this.user.email;
    let emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);

  }

  isValidPassword(): boolean{
    let password: string = this.user.password;
    let passwordRegex: RegExp = /[a-zA-Z0-9]+/;
    return passwordRegex.test(password);

  }
}

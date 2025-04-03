import { Component } from '@angular/core';
import {RegisterUser} from "../models/register-user";
import {Router} from "@angular/router";
import {UserService} from "../services/user-service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: RegisterUser = new RegisterUser();
  validEmailAddress: boolean = true;

  constructor(
      private userService: UserService,
      private router: Router
  ){

  }

  createUser(){
    this.userService.create(this.user).subscribe(() => {
      this.goToLogin();
    })
  }

  goToLogin(){
    this.router.navigate(['/auth/login']);
  }

  isValidName(name: string): boolean{
    let nameRegex: RegExp = /^[\p{L}\p{M} ]+$/u;
    if(!nameRegex.test(name)){
      return false;
    }
    return true;
  }

  isValidEmail(): boolean{
    let email: string = this.user.email;
    let emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailRegex.test(email)){
      return false;
    }
    return true;
  }

  isValidPassword(): boolean{
    let password: string = this.user.password;
    let passwordRegex: RegExp = /[a-zA-Z0-9]+/;
    if(!passwordRegex.test(password)){
      return false;
    }

    return true;
  }

  isAllValid(): boolean{
    return this.isValidEmail()
        && this.isValidPassword();
  }
}

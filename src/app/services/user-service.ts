import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment";
import { Router } from "@angular/router";
import {BaseService} from "./base-service";
import {RegisterUser} from "../models/register-user";
import {AuthResponse} from "../models/auth-response";


@Injectable({
    providedIn: 'root'
  })
export class UserService extends BaseService{
    
    private readonly LOGIN_URL: string = environment.API_URL + "/api/v1/auth/authenticate";
    private readonly REGSITRATION_URL = environment.API_URL + "/api/v1/auth/register";

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ){
        super();
    }

    create(newUser: RegisterUser): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(this.REGSITRATION_URL, newUser);
    }

    login(user: RegisterUser): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(this.LOGIN_URL, user);
      }    
    
    logout(){
        sessionStorage.removeItem("current-user-token");
        sessionStorage.removeItem('current-user-id');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean{
        return sessionStorage.getItem("current-user-token") != null;
    }
}
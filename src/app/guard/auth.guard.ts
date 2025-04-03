import {Router} from "@angular/router";
import {inject} from "@angular/core";
import {UserService} from "../services/user-service";

export const authGuard = () => {
    const authService = inject(UserService);
    const router = inject(Router);

    authService.isLoggedIn();

    if (authService.isLoggedIn()){
        return true;
    }

    return router.parseUrl('/login');
};
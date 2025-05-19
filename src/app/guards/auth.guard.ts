import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../components/user/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const isLoggedIn = userService.isLogged;

  if(!isLoggedIn){
    router.navigate(['/login']);
  }

  return isLoggedIn;
};
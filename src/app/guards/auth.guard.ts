import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../components/user/user.service';
import { firstValueFrom, take } from 'rxjs';

export const AuthGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const userService = inject(UserService);

    try {
        const user = await firstValueFrom(
            userService.getProfile().pipe(take(1))
        );
        if (!user) {
            router.navigate(['/login']);
            return false;
        }
        return true;

    } catch {
        router.navigate(['/login']);
        return false;
    }

}
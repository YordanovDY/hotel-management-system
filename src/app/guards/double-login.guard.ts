import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../components/user/user.service';
import { firstValueFrom, take } from 'rxjs';

export const DoubleLoginGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const userService = inject(UserService);

    try {
        const user = await firstValueFrom(
            userService.getProfile().pipe(take(1))
        );
        if (user) {
            router.navigate(['/dashboard']);
            return false;
        }
        return true;

    } catch {
        router.navigate(['/']);
        return false;
    }
};

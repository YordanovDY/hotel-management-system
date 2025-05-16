import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from "./components/core/header/header.component";
import { FooterComponent } from "./components/core/footer/footer.component";
import { UserService } from './components/user/user.service';
import { AuthenticateComponent } from "./components/authenticate/authenticate.component";
import { User } from './components/user/user.types';
import { MatButtonModule } from '@angular/material/button';
import { RoleNamePipe } from './pipes/role-name.pipe';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    FooterComponent,
    AuthenticateComponent,
    MatButtonModule,
    RoleNamePipe,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  private isLogoutPending$$ = new BehaviorSubject<boolean>(false);
  public isLogoutPending$ = this.isLogoutPending$$.asObservable();

  title = 'hotel-management-system';
  isMenuShown: boolean = false;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get user(): User | null {
    return this.userService.userData;
  }

  constructor(private userService: UserService, private router: Router) {

    this.logoutHandler = () => {
      this.isLogoutPending$$.next(true);
      this.drawer.close();

      return this.userService.logout().subscribe(() => {
        this.isLogoutPending$$.next(false);
        this.router.navigate(['/']);
      })
    }
  }

  showMenu() {
    this.drawer.toggle();
    this.isMenuShown = !this.isMenuShown;
  }

  logoutHandler!: () => Subscription;
}

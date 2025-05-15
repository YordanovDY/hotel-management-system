import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from "./components/core/header/header.component";
import { FooterComponent } from "./components/core/footer/footer.component";
import { UserService } from './components/user/user.service';
import { AuthenticateComponent } from "./components/authenticate/authenticate.component";
import { User } from './components/user/user.types'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    FooterComponent,
    AuthenticateComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel-management-system';
  isMenuShown: boolean = false;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get user(): User | null{
    return this.userService.userData;
  }

  constructor(private userService: UserService) { }

  showMenu() {
    this.isMenuShown = !this.isMenuShown;
  }
}

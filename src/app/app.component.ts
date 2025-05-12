import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { User } from './types/User';
import { LoginComponent } from "./components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    LoginComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel-management-system';
  isMenuShown: boolean = false;
  user: User | null = {
    id: '389hoihei',
    email: 'asdaf',
    firstName: 'sdfada',
    lastName: 'sdfsgfsgf',
    phoneNumber: '039822242',
    roleId: 1
  };

  showMenu() {
    this.isMenuShown = !this.isMenuShown;
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel-management-system';
  isMenuShown: boolean = false;

  showMenu() {
    this.isMenuShown = !this.isMenuShown;
  }
}

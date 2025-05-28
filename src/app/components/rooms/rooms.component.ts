import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  isDetailsShown: boolean = false;

  hideDetails() {
    this.isDetailsShown = false;
  }

  showDetails() {
    this.isDetailsShown = true;
  }

  get show(): boolean {
    return this.isDetailsShown;
  }
}

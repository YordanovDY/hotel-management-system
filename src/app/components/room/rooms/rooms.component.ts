import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BooleanIconComponent } from "../../shared/boolean-icon/boolean-icon.component";

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [MatButtonModule, RouterLink, BooleanIconComponent],
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

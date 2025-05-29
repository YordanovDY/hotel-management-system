import { Component, EventEmitter, Output } from '@angular/core';
import { BooleanIconComponent } from '../../../shared/boolean-icon/boolean-icon.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [BooleanIconComponent, MatButtonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent {
  @Output() requestHide = new EventEmitter<void>();

  hide() {
    this.requestHide.emit();
  }
}

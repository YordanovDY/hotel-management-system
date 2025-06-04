import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooleanIconComponent } from '../../../shared/boolean-icon/boolean-icon.component';
import { MatButtonModule } from '@angular/material/button';
import { Room } from '../../room.types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [BooleanIconComponent, MatButtonModule, SpinnerComponent, AsyncPipe, RouterLink],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent {
  @Input('room') room: Room | null = null;
  @Input('isPending') isPending!: Observable<boolean>;

  @Output() requestHide = new EventEmitter<void>();

  hide() {
    this.requestHide.emit();
  }
}

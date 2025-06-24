import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooleanIconComponent } from '../../../shared/boolean-icon/boolean-icon.component';
import { MatButtonModule } from '@angular/material/button';
import { Room } from '../../room.types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { RouterLink } from '@angular/router';
import { ConfirmationComponent } from '../../../shared/dialogs/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../../shared/dialogs/confirmation/confirmation.types';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
    BooleanIconComponent,
    MatButtonModule,
    SpinnerComponent,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent {
  @Input('room') room: Room | null = null;
  @Input('isPending') isPending!: Observable<boolean>;
  @Input('getDeletionData') getDeletionData!: (delRoom: Room) => ConfirmationDialog;

  @Output() requestHide = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  hide() {
    this.requestHide.emit();
  }

  showDeleteConfirmation() {
    if (!this.room) {
      return;
    }

    this.dialog.open(ConfirmationComponent, {
      data: this.getDeletionData(this.room)
    });
  }
}

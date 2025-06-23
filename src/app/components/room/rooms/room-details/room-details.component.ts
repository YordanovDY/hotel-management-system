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

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
    BooleanIconComponent,
    MatButtonModule,
    SpinnerComponent,
    AsyncPipe,
    RouterLink,
    ConfirmationComponent,
  ],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent {
  @Input('room') room: Room | null = null;
  @Input('isPending') isPending!: Observable<boolean>;

  @Output() requestHide = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  hide() {
    this.requestHide.emit();
  }

  showDeleteConfirmation() {
    this.dialog.open(ConfirmationComponent, {
      data:{
        title: 'Do you want to delete this room?',
        content: `Room ${this.room?.roomNumber} will be removed...`,
        confirmationBtnName: 'Delete',
        handler: ()=>{
          console.log(`Room ${this.room?.roomNumber} with ID ${this.room?.id} has been removed.`);
          this.requestHide.emit();
        }
      }
    });
  }

  onDelete() {

  }
}

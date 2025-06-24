import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BooleanIconComponent } from '../../../shared/boolean-icon/boolean-icon.component';
import { MatButtonModule } from '@angular/material/button';
import { Room } from '../../room.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { RouterLink } from '@angular/router';
import { ConfirmationComponent } from '../../../shared/dialogs/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { RoomService } from '../../room.service';
import { NotificationComponent } from "../../../shared/notification/notification.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
    BooleanIconComponent,
    MatButtonModule,
    SpinnerComponent,
    AsyncPipe,
    RouterLink,
    NotificationComponent
  ],
  providers: [
    RoomService
  ],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent {
  private isDeletionPending$$ = new BehaviorSubject<boolean>(false);
  private isDeletionPending$ = this.isDeletionPending$$.asObservable();

  @Input('room') room: Room | null = null;
  @Input('isPending') isPending!: Observable<boolean>;

  @Output() requestHide = new EventEmitter<void>();

  @ViewChild('notification') notification!: NotificationComponent;

  constructor(private dialog: MatDialog, private roomService: RoomService) { }

  hide() {
    this.requestHide.emit();
  }

  showDeleteConfirmation() {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Do you want to delete this room?',
        content: `Room ${this.room?.roomNumber} will be removed...`,
        confirmationBtnName: 'Delete',
        handler: () => {
          this.isDeletionPending$$.next(true);
          this.requestHide.emit();

          if (this.room === null || !this.room.id) {
            this.notification.showNotification({
              type: 'error',
              message: 'Something went wrong. Please try again!'
            });

            return;
          }

          const roomId = this.room.id;
          const roomNumber = this.room.roomNumber;

          this.roomService.deleteRoom(roomId).subscribe({
            next: () => {
              this.notification.showNotification({
                type: 'success',
                message: `Room ${roomNumber} has been deleted.`
              })

              this.isDeletionPending$$.next(false);
            },

            error: (err) => {
              let message: string = 'Something went wrong. Please try again!';

              if (err instanceof HttpErrorResponse) {
                message = err.error.message;
              }

              this.notification.showNotification({
                type: 'error',
                message
              })

              this.isDeletionPending$$.next(false);
            },

            complete: () => {
              this.isDeletionPending$$.next(false);
            }
          })
        }
      }
    });
  }
}

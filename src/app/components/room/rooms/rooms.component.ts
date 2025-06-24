import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RoomService } from '../room.service';
import { getFloorUtil } from '../room.utils';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { Room } from '../room.types';
import { ConfirmationDialog } from '../../shared/dialogs/confirmation/confirmation.types';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    SpinnerComponent,
    AsyncPipe,
    RoomDetailsComponent,
    NotificationComponent,
  ],
  providers: [RoomService],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {
  private _floor: number = 0;

  private isRoomsPending$$ = new BehaviorSubject<boolean>(true);
  public isRoomsPending$ = this.isRoomsPending$$.asObservable();

  private isDetailsPending$$ = new BehaviorSubject<boolean>(false);
  public isDetailsPending$ = this.isDetailsPending$$.asObservable();

  private isDeletionPending$$ = new BehaviorSubject<boolean>(false);
  private isDeletionPending$ = this.isDeletionPending$$.asObservable();
  @ViewChild('notification') notification!: NotificationComponent;

  isDetailsShown: boolean = false;

  get rooms() {
    return this.roomService.rooms$;
  }

  get room() {
    return this.roomService.roomDetails$;
  }

  get lastFloor() {
    return this._floor;
  }

  set lastFloor(value: number) {
    this._floor = value;
  }

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(result => {
      this.lastFloor = result.length;
      this.isRoomsPending$$.next(false);
    })
  }

  getFloor = getFloorUtil;

  hideDetails() {
    this.isDetailsShown = false;
  }

  showDetails(roomId: string) {
    this.isDetailsPending$$.next(true);
    this.isDetailsShown = true;

    this.roomService.getSingleRoom(roomId).subscribe(() => {
      this.isDetailsPending$$.next(false);
    })
  }

  get show(): boolean {
    return this.isDetailsShown;
  }

   getDeletionData(delRoom: Room): ConfirmationDialog {
    return {
      title: 'Do you want to delete this room?',
      content: `Room ${delRoom.roomNumber} will be removed...`,
      confirmationBtnName: 'Delete',
      handler: () => {
        this.isDeletionPending$$.next(true);
        this.isDetailsShown = false;
  
        if (delRoom === null || !delRoom.id) {
          this.notification.showNotification({
            type: 'error',
            message: 'Something went wrong. Please try again!'
          });
  
          return;
        }
  
        const roomId = delRoom.id;
        const roomNumber = delRoom.roomNumber;
  
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
  }
}

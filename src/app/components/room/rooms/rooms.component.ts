import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RoomService } from '../room.service';
import { getFloorUtil } from '../room.utils';
import { RoomDetailsComponent } from './room-details/room-details.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    SpinnerComponent,
    AsyncPipe,
    RoomDetailsComponent,
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

  isDetailsShown: boolean = false;

  get rooms() {
    return this.roomService.rooms$;
  }

  get room(){
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
}

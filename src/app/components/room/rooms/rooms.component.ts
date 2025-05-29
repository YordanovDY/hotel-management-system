import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BooleanIconComponent } from "../../shared/boolean-icon/boolean-icon.component";
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RoomService } from '../room.service';
import { getFloorUtil } from '../room.utils';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    BooleanIconComponent,
    SpinnerComponent,
    AsyncPipe,
  ],
  providers: [RoomService],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {
  private isRoomsPending$$ = new BehaviorSubject<boolean>(true);
  public isRoomsPending$ = this.isRoomsPending$$.asObservable();

  isDetailsShown: boolean = false;
  private _floor: number = 0;

  get rooms() {
    return this.roomService.rooms$;
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

  showDetails() {
    this.isDetailsShown = true;
  }

  get show(): boolean {
    return this.isDetailsShown;
  }
}

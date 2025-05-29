import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LiteRoom, Room } from './room.types';

@Injectable()
export class RoomService {
  private rooms$$ = new BehaviorSubject<LiteRoom[][] | null>(null);
  public rooms$ = this.rooms$$.asObservable();

  private roomDetails$$ = new BehaviorSubject<Room | null>(null);
  public roomDetails$ = this.roomDetails$$.asObservable();

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get<LiteRoom[][]>('/api/rooms').pipe(tap(
      roomsList => this.rooms$$.next(roomsList)
    ))
  }

  getSingleRoom(roomId: string) {
    return this.http.get<Room>(`/api/rooms/${roomId}`).pipe(tap(
      room => this.roomDetails$$.next(room)
    ))
  }
}

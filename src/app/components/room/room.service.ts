import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LiteRoom, Room, RoomInput } from './room.types';

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

  createRoom(data: RoomInput) {
    const newRoom = {
      ...data,
      floor: Number(data.floor),
      bedsCount: Number(data.bedsCount),
      pricePerNight: Number(data.pricePerNight)
    };

    return this.http.post<Room>('/api/rooms', newRoom);
  }

  editRoom(roomId: string, data: RoomInput) {
    const updatedRoom = {
      ...data,
      floor: Number(data.floor),
      bedsCount: Number(data.bedsCount),
      pricePerNight: Number(data.pricePerNight)
    };

    return this.http.put(`/api/rooms/${roomId}`, updatedRoom);
  }


  deleteRoom(roomId: string) {
    return this.http.delete<Room>(`/api/rooms/${roomId}`).pipe(tap(
      room => {
        const rooms = this.rooms$$.getValue();

        if (rooms) {
          const updatedRooms = rooms.map(floors => {
            return floors.filter(r => r.id !== room.id);
          });
          this.rooms$$.next(updatedRooms);
        }

      }
    ))
  }
}

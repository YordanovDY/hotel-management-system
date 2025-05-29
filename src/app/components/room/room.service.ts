import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LiteRoom } from './room.types';

@Injectable()
export class RoomService {
  private rooms$$ = new BehaviorSubject<LiteRoom[][] | null>(null);
  public rooms$ = this.rooms$$.asObservable();

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get<LiteRoom[][]>('/api/rooms').pipe(tap(
      roomsList => this.rooms$$.next(roomsList)
    ))
  }
}

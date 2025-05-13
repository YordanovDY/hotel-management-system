import { Injectable, OnInit } from '@angular/core';
import { User } from './types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | null = {
    id: '389hoihei',
    email: 'asdaf',
    firstName: 'sdfada',
    lastName: 'sdfsgfsgf',
    phoneNumber: '039822242',
    roleId: 1
  };

  constructor() { }
}

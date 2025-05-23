import { Injectable } from '@angular/core';
import { LoginCredentials, RegisterCredentials, User } from './user.types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<User | null>(null);
  private user$ = this.user$$.asObservable();

  user: User | null = null;

  get isLogged() {
    return !!this.user;
  }

  get userData() {
    return this.user;
  }

  get isAdmin() {
    return this.user?.roleId === 1;
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe(user => {
      this.user = user;
    })
  }

  login(credentials: LoginCredentials) {
    return this.http.post<User>('/api/auth/login', credentials).pipe(tap(
      user => this.user$$.next(user)
    ))
  }

  logout() {
    return this.http.get('/api/auth/logout').pipe(tap(
      response => this.user$$.next(null)
    ))
  }

  getProfile() {
    return this.http.get<User | null>('/api/auth/user').pipe(tap(
      user => this.user$$.next(user)
    ))
  }

  register(credentials: RegisterCredentials) {
    const registerData = {
      ...credentials,
      roleId: Number(credentials.role)
    }
    return this.http.post<User>('/api/auth/register', registerData);
  }
}

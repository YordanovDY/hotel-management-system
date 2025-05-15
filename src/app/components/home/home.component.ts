import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  get isLoggedIn(): boolean{
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) { }
}

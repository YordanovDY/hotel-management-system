import { Component } from '@angular/core';
import { NotificationAlert } from './notification.types';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  messages: NotificationAlert[] = [];

  showNotification(notification: NotificationAlert){
    this.messages.push(notification);
  }
}

import { Component } from '@angular/core';
import { NotificationAlert } from './notification.types';
import { interval, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  messages: NotificationAlert[] = [];

  showNotification(notification: NotificationAlert) {
    this.messages.push(notification);

    if (this.messages.length === 1) {
      this.removeOldNotifications();
    }
  }

  private removeOldNotifications() {
    interval(6000).pipe(
      takeWhile(() => this.messages.length > 0),
      tap(() => this.messages.shift())
    )
      .subscribe();
  }
}

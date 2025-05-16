type NotificationType = 'error' | 'success' | 'warning';

export interface NotificationAlert {
    type: NotificationType;
    message: string;
}
import { Component, ViewChild } from '@angular/core';
import { StandardFormComponent } from '../../shared/standard-form/standard-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Checkbox, FormFieldTemplate, SelectField, TextField } from '../../shared/standard-form/form-fields';
import roomNumberValidator from '../../../validators/roomN-validator';
import positiveIntValidator from '../../../validators/positive-int-validator';
import priceValidator from '../../../validators/price-validator';
import { RoomService } from '../room.service';
import { RoomInput } from '../room.types';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [StandardFormComponent, NotificationComponent],
  providers: [RoomService],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  @ViewChild('notification') notification !: NotificationComponent;

  private isPending$$ = new BehaviorSubject<boolean>(false);
  public isPending$ = this.isPending$$.asObservable();

  formGroup = new FormGroup({
    roomNumber: new FormControl('', [Validators.required, roomNumberValidator()]),
    type: new FormControl('', [Validators.required]),
    exposure: new FormControl('', [Validators.required]),
    floor: new FormControl('', [Validators.required, positiveIntValidator()]),
    bedsCount: new FormControl('', [Validators.required, positiveIntValidator()]),
    pricePerNight: new FormControl('', [Validators.required, priceValidator()]),
    hasAc: new FormControl(false),
  })

  createRoomHandler!: (input: RoomInput) => Subscription | void;

  constructor(private roomService: RoomService) {

    this.createRoomHandler = (input: RoomInput) => {

      this.isPending$$.next(true);

      return this.roomService.createRoom(input).subscribe({
        next: (room) => {
          this.notification.showNotification({ type: 'success', message: `${room.roomNumber} has been successfully created.` })
          this.isPending$$.next(false);
        },

        error: (err) => {
          this.isPending$$.next(false);

          if (err instanceof HttpErrorResponse) {
            this.notification.showNotification({ type: 'error', message: err.error.message });
            return;
          }

          this.notification.showNotification({ type: 'error', message: 'Ops, something went wrong!' });
        },

        complete: () => {
          this.isPending$$.next(false);
        }
      })
    }
  }

  formTemplate: FormFieldTemplate[] = [
    new TextField('Room Number', 'roomNumber', 'roomNumber'),
    new SelectField('Type', 'type', 'type', [
      { label: '--- Select Type ---', value: '' },
      { value: 'Single', label: 'Single' },
      { value: 'Double', label: 'Double' },
      { value: 'Apartment', label: 'Apartment' },
      { value: 'President', label: 'President' }
    ]),
    new SelectField('Exposure', 'exposure', 'exposure', [
      { label: '--- Select Exposure ---', value: '' },
      { value: 'North', label: 'North' },
      { value: 'East', label: 'East' },
      { value: 'South', label: 'South' },
      { value: 'West', label: 'West' }
    ]),
    new TextField('Floor', 'floor', 'floor'),
    new TextField('Beds Count', 'bedsCount', 'bedsCount'),
    new TextField('Price per Night', 'pricePerNight', 'pricePerNight'),
    new Checkbox('Air Condition', 'hasAc', 'hasAc'),
  ]
}

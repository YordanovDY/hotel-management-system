import { Component, OnInit, ViewChild } from '@angular/core';
import { StandardFormComponent } from '../../shared/standard-form/standard-form.component';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { RoomService } from '../room.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import roomNumberValidator from '../../../validators/roomN-validator';
import positiveIntValidator from '../../../validators/positive-int-validator';
import priceValidator from '../../../validators/price-validator';
import { Checkbox, FormFieldTemplate, SelectField, TextField } from '../../shared/standard-form/form-fields';
import { RoomInput } from '../room.types';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [StandardFormComponent, NotificationComponent, AsyncPipe, SpinnerComponent],
  providers: [RoomService],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit {
  @ViewChild('notification') notification !: NotificationComponent;

  private isRoomPending$$ = new BehaviorSubject<boolean>(true);
  public isRoomPending$ = this.isRoomPending$$.asObservable();

  private isUpdatePending$$ = new BehaviorSubject<boolean>(false);
  public isUpdatePending$ = this.isUpdatePending$$.asObservable();

  editRoomHandler!: (input: RoomInput) => Subscription | void;

  ngOnInit(): void {
    this.isRoomPending$$.next(true);

    const roomId: string = this.route.snapshot.params['roomId'];
    this.roomService.getSingleRoom(roomId).subscribe({
      next: (room) => {
        this.formGroup.patchValue({
          roomId: room.id,
          roomNumber: room.roomNumber,
          type: room.type,
          exposure: room.exposure,
          floor: room.floor.toString(),
          bedsCount: room.bedsCount.toString(),
          hasAc: room.hasAc,
          pricePerNight: room.pricePerNight.toFixed(2)
        })

        this.isRoomPending$$.next(false);
      },

      error: (err) => {
        this.notification.showNotification({ type: 'error', message: 'Room loading failed!' });
        this.isRoomPending$$.next(false);
      },

      complete: () => {
        this.isRoomPending$$.next(false);
      }
    })
  }

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.editRoomHandler = (input: RoomInput) => {
      
      if (!input.roomId) {
        this.notification.showNotification({
          type: 'error',
          message: 'Something went wrong. Please try again!'
        })
        return;
      }

      this.isUpdatePending$$.next(true);

      return roomService.editRoom(input.roomId, input).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/rooms-management']);
          this.isUpdatePending$$.next(false);
        },

        error: (err) => {
          this.isUpdatePending$$.next(false);

          if (err instanceof HttpErrorResponse) {
            this.notification.showNotification({ type: 'error', message: err.error.message });
            return;
          }

          this.notification.showNotification({ type: 'error', message: 'Ops, something went wrong!' });
        },

        complete: () =>{
          this.isUpdatePending$$.next(false);
        }
      })
    }
  }

  formGroup = new FormGroup({
    roomId: new FormControl(''),
    roomNumber: new FormControl('', [Validators.required, roomNumberValidator()]),
    type: new FormControl('', [Validators.required]),
    exposure: new FormControl('', [Validators.required]),
    floor: new FormControl('', [Validators.required, positiveIntValidator()]),
    bedsCount: new FormControl('', [Validators.required, positiveIntValidator()]),
    pricePerNight: new FormControl('', [Validators.required, priceValidator()]),
    hasAc: new FormControl(false),
  })

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

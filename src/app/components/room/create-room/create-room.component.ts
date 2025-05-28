import { Component } from '@angular/core';
import { StandardFormComponent } from '../../shared/standard-form/standard-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Checkbox, FormFieldTemplate, SelectField, TextField } from '../../shared/standard-form/form-fields';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [StandardFormComponent],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  formGroup = new FormGroup({
    roomNumber: new FormControl('', [Validators.required]), // roomNumberValidator
    type: new FormControl('', [Validators.required]),
    exposure: new FormControl('', [Validators.required]),
    floor: new FormControl('', [Validators.required]), // positiveIntValidator
    bedsCount: new FormControl('', [Validators.required]), // positiveIntValidator
    pricePerNight: new FormControl('', [Validators.required]), // priceValidator
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

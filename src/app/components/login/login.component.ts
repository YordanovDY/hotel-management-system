import { Component } from '@angular/core';
import { StandardFormComponent } from '../shared/standard-form/standard-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldTemplate, PassField, TextField } from '../shared/standard-form/form-fields';
import emailValidatorFn from '../../validators/email-validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [StandardFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidatorFn()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(24)
    ])
  })

  formTemplate: FormFieldTemplate[] = [
    new TextField('Email', 'email', 'email'),
    new PassField('Password', 'password', 'password')
  ]
}

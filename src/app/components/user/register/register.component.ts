import { Component, ViewChild } from '@angular/core';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailValidatorFn from '../../../validators/email-validator';
import { FormFieldTemplate, PassField, SelectField, TextField } from '../../shared/standard-form/form-fields';
import { StandardFormComponent } from "../../shared/standard-form/standard-form.component";
import phoneValidatorFn from '../../../validators/phone-validator';
import { RegisterCredentials } from '../user.types';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [StandardFormComponent, NotificationComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('notification') notification !: NotificationComponent;

  private isPending$$ = new BehaviorSubject<boolean>(false);
  public isPending$ = this.isPending$$.asObservable();

  formGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),

    email: new FormControl('', [Validators.required, emailValidatorFn()]),

    phoneNumber: new FormControl('', [Validators.required, phoneValidatorFn()]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(24)
    ]),

    repassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(24)
    ]),

    role: new FormControl('', [Validators.required]),
  })

  formTemplate: FormFieldTemplate[] = [
    new TextField('First Name', 'firstName', 'firstName'),
    new TextField('Last Name', 'lastName', 'lastName'),
    new TextField('Email', 'email', 'email'),
    new TextField('Phone Number', 'phoneNumber', 'phoneNumber'),
    new PassField('Password', 'password', 'password'),
    new PassField('Repeat Password', 'repassword', 'repassword'),
    new SelectField('Role', 'role', 'role', [
      { label: '--- Select Role ---', value: '' },
      { label: 'Admin', value: '1' },
      { label: 'Receptionist', value: '2' }
    ])
  ]

  registerHandler!: (credentials: RegisterCredentials) => Subscription | void;


  constructor(private userService: UserService) {
    this.registerHandler = (credentials: RegisterCredentials) => {
      if (credentials.password !== credentials.repassword) {
        this.notification.showNotification({ type: 'error', message: 'Passwords mismatched!' });
        this.formGroup.controls.password.reset();
        this.formGroup.controls.repassword.reset();
        return;
      }

      this.isPending$$.next(true);

      return this.userService.register(credentials).subscribe({
        next: () => {
          this.notification.showNotification({ type: 'success', message: `${credentials.firstName} ${credentials.lastName} is registered in the system.` });
          this.formGroup.reset();
          this.isPending$$.next(false);
        },
        error: (err) => {
          this.isPending$$.next(false);
          this.formGroup.controls.password.reset();
          this.formGroup.controls.repassword.reset();

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
}

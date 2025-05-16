import { Component } from '@angular/core';
import { StandardFormComponent } from '../../shared/standard-form/standard-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldTemplate, PassField, TextField } from '../../shared/standard-form/form-fields';
import emailValidatorFn from '../../../validators/email-validator';
import { UserService } from '../user.service';
import { LoginCredentials } from '../user.types';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [StandardFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private isPending$$ = new BehaviorSubject<boolean>(false);
  public isPending$ = this.isPending$$.asObservable();

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

  loginHandler!: (credentials: LoginCredentials) => Subscription;


  constructor(private userService: UserService, private router: Router) {
    this.loginHandler = (credentials: LoginCredentials) => {
      this.isPending$$.next(true);

      return this.userService.login(credentials).subscribe({
        next: () => {
          this.isPending$$.next(false);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          // TODO: Error Handling
          this.isPending$$.next(false);
        },
        complete: () => {
          this.isPending$$.next(false);
        }
      })
    }
  }
}

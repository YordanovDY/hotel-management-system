import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldComponent } from "./text-field/text-field.component";
import { PassFieldComponent } from "./pass-field/pass-field.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldTemplate } from './form-fields';
import { StandardFormHandler } from './standard-form.types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SelectFieldComponent } from './select-field/select-field.component';
import { CheckboxComponent } from "./checkbox/checkbox.component";

@Component({
  selector: 'app-standard-form',
  standalone: true,
  imports: [
    MatButtonModule,
    TextFieldComponent,
    PassFieldComponent,
    ReactiveFormsModule,
    SelectFieldComponent,
    AsyncPipe,
    CheckboxComponent
],
  templateUrl: './standard-form.component.html',
  styleUrl: './standard-form.component.css'
})
export class StandardFormComponent {
  @Input('title') title: string = 'Form';
  @Input('btnLabel') btnLabel: string = 'Submit';
  @Input('formGroup') formModel!: FormGroup;
  @Input('formTemplate') formTemplate!: FormFieldTemplate[];
  @Input('handler') handler!: StandardFormHandler;
  @Input('isPending') isPending!: Observable<boolean>;

  get isInvalid(): boolean {
    return this.formModel.invalid;
  }

  submitHandler() {
    if (this.formModel.invalid) {
      console.error('Invalid input!');
      return;
    }

    this.handler(this.formModel.value);
  }

}
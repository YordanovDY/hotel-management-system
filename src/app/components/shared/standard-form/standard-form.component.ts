import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldComponent } from "./text-field/text-field.component";
import { PassFieldComponent } from "./pass-field/pass-field.component";
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-standard-form',
  standalone: true,
  imports: [
    MatButtonModule,
    TextFieldComponent,
    PassFieldComponent,
    FormsModule
  ],
  templateUrl: './standard-form.component.html',
  styleUrl: './standard-form.component.css'
})
export class StandardFormComponent {
  @Input('title') title: string = 'Form';
  @Input('btnLabel') btnLabel: string = 'Submit';
  @ViewChild('formRef') form: NgForm | undefined;

  // TODO: @Input('model') model: Model = {};
  model = {
    email: ''
  };

  submitHandler() {
    console.log(this.form);
  }
}
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldComponent } from "./text-field/text-field.component";
import { PassFieldComponent } from "./pass-field/pass-field.component";

@Component({
  selector: 'app-standard-form',
  standalone: true,
  imports: [
    MatButtonModule,
    TextFieldComponent,
    PassFieldComponent
  ],
  templateUrl: './standard-form.component.html',
  styleUrl: './standard-form.component.css'
})
export class StandardFormComponent {
  @Input('title') title: string = 'Form';
  @Input('btnLabel') btnLabel: string ='Submit';
}
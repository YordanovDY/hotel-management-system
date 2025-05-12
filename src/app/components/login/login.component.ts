import { Component } from '@angular/core';
import { StandardFormComponent } from '../shared/standard-form/standard-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [StandardFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}

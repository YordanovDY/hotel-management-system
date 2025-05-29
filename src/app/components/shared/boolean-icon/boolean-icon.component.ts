import { Component, Input } from '@angular/core';
import { BooleanIconSize } from './boolean-icon.types';

@Component({
  selector: 'app-boolean-icon',
  standalone: true,
  imports: [],
  templateUrl: './boolean-icon.component.html',
  styleUrl: './boolean-icon.component.css'
})
export class BooleanIconComponent {
  @Input('value') value: boolean = false;
  @Input('size') size: BooleanIconSize = 'medium';
}

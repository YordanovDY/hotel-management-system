import { Component, Injector, Input, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { FormField } from '../base-field-accessor';

@Component({
  selector: 'app-pass-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './pass-field.component.html',
  styleUrl: './pass-field.component.css'
})
export class PassFieldComponent extends FormField{
  @Input('label') label: string = 'Password';
  @Input('name') name!: string;
  @Input('isRequired') isRequired: boolean = true;

  get palette(): ThemePalette {
    const control = this.ngControl?.control;

    if (!control || !control.touched) {
      return 'primary';
    }

    if (control.hasError('required')) {
      return 'warn';
    }

    if (control.hasError('minlength')) {
      return 'warn';
    }

    if (control.hasError('maxlength')) {
      return 'warn';
    }

    // More errors here

    return 'primary';
  }

  ngControl: NgControl | null = null;

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  constructor(private injector: Injector) {
    super();
  }

  onBlur() {
    this.markAsTouched();
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}

import { CommonModule } from '@angular/common';
import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { FormField } from '../base-field-accessor';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.css'
})
export class TextFieldComponent extends FormField implements OnInit {
  @Input('label') label: string = 'Text Input';
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
}

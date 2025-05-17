import { Component, Injector, Input } from '@angular/core';
import { FormField } from '../base-field-accessor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SelectOptions } from './select-field.types';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.css'
})
export class SelectFieldComponent extends FormField<string> {
  @Input('label') label: string = 'Select Input';
  @Input('name') name!: string;
  @Input('isRequired') isRequired: boolean = true;
  @Input('options') options: SelectOptions[] = [];

  get palette(): ThemePalette {
    const control = this.ngControl?.control;

    if (!control || !control.touched) {
      return 'primary';
    }

    if (control.hasError('required')) {
      return 'warn';
    }

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

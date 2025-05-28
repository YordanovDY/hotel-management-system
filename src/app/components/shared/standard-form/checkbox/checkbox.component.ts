import { Component, Injector, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormField } from '../base-field-accessor';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent extends FormField<boolean> implements OnInit {
  @Input('label') label: string = 'Checkbox';
  @Input('name') name!: string;

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

  onCheckboxChange(event: any) {
    this.updateValue(event.checked);
  }
}

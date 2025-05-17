import { ControlValueAccessor } from "@angular/forms";

export abstract class FormField<T = any> implements ControlValueAccessor {
    value!: T;
    isDisabled = false;

    private onChange: (value: T) => void = () => { };
    private onTouched: () => void = () => { };

    writeValue(value: T): void {
        this.value = value ?? ('' as any);
    }

    registerOnChange(fn: (value: T) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    protected markAsTouched(): void {
        this.onTouched();
    }

    protected updateValue(value: T): void {
        this.value = value;
        this.onChange(value);
    }

    protected handleInput(event: Event): void {
        const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        this.updateValue(target.value as T);
    }
}
import { ValidatorFn } from "@angular/forms";

export default function priceValidator(): ValidatorFn {
    const pricePattern = /^[0-9]+(\.{1}[0-9]{2})?$/m;

    return (control) => {
        const value = control.value;
        const isValid = value === '' || pricePattern.test(value);

        if (isValid) {
            return null;
        }

        return { priceValidator: true };
    }
}
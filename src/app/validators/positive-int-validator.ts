import { ValidatorFn } from "@angular/forms";

export default function positiveIntValidator(): ValidatorFn {
    return (control) => {
        const value = control.value;

        if (value === '') {
            return null;
        }

        if (String(value).endsWith('.')) {
            return { positiveIntValidator: true };
        }

        if (Number.isNaN(Number(value))) {
            return { positiveIntValidator: true };
        }

        if (!Number.isInteger(Number(value))) {
            return { positiveIntValidator: true };
        }

        if (Number(value) < 1) {
            return { positiveIntValidator: true };
        }

        return null;
    }
}
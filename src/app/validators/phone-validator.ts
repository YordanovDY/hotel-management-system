import { ValidatorFn } from "@angular/forms";

export default function phoneValidatorFn(): ValidatorFn {
    const phonePattern = /^[0-9]{10,15}$/m;

    return (control) => {
        const value = control.value;
        const isValid = value === '' || phonePattern.test(value);

        if (isValid) {
            return null;
        }

        return { phoneValidator: true };
    }
}
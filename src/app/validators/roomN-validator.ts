import { ValidatorFn } from "@angular/forms";

export default function roomNumberValidator(): ValidatorFn {
    const roomPattern = /^[0-9]{3}$/m;

    return (control) => {
        const value = control.value;
        const isValid = value === '' || roomPattern.test(value);

        if (isValid) {
            return null;
        }

        return { roomNumberValidator: true };
    }
}
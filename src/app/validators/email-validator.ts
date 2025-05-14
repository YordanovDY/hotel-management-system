import { ValidatorFn } from "@angular/forms";
import { DOMAINS } from "../constants"

export default function emailValidatorFn(): ValidatorFn {
    const domainStr = DOMAINS.join('|');
    const emailPattern = new RegExp(`^[a-z]{1}[a-z0-9\._]+[a-z0-9]{1}@(${domainStr})$`);

    return (control) => {
        const value = control.value;
        const isValid = value === '' || emailPattern.test(value);

        if (isValid) {
            return null;
        }

        return { emailValidator: true };
    }
}
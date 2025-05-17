import { SelectOptions } from "./select-field/select-field.types";

abstract class BaseField {
    label: string;
    name: string;
    formControlName: string;
    options: SelectOptions[] = [];
    abstract type: string;

    constructor(label: string, name: string, formControlName: string, options?: SelectOptions[]) {
        this.label = label;
        this.name = name;
        this.formControlName = formControlName;

        if (options) {
            this.options = options;
        }
    }
}

export class TextField extends BaseField {
    type = 'text';

    constructor(label: string, name: string, formControlName: string) {
        super(label, name, formControlName);
    }
}

export class PassField extends BaseField {
    type = 'password';

    constructor(label: string, name: string, formControlName: string) {
        super(label, name, formControlName);
    }
}

export class SelectField extends BaseField {
    type = 'select';

    constructor(label: string, name: string, formControlName: string, options: SelectOptions[]) {
        super(label, name, formControlName, options);
    }
}

export type FormFieldTemplate = TextField | PassField | SelectField;
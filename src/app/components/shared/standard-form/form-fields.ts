abstract class BaseField {
    label: string;
    name: string;
    formControlName: string;
    abstract type: string;

    constructor(label: string, name: string, formControlName: string) {
        this.label = label;
        this.name = name;
        this.formControlName = formControlName;
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

export type FormFieldTemplate = TextField | PassField;
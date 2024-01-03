type FormTypes = 'input' | 'textarea' | 'select' | 'radio';
class FormField {
  constructor(
    public label: string,
    public value: any,
    public type: FormTypes,
    public key: string,
    public required: boolean,
    public defaultValue: any,
  ) {}
}

export class InputField extends FormField {
  constructor(
    public label: string,
    public key: string,
    public value: string,
    public defaultValue: string,
    public required: boolean,
    public placeholder?: string,
    public disabled?: boolean,
  ) {
    super(label, value, 'input', key, required, defaultValue);
  }
}

export class TextareaField extends FormField {
  constructor(
    public label: string,
    public key: string,
    public value: string,
    public defaultValue: string,
    public required: boolean,
    public placeholder?: string,
    public disabled?: boolean,
  ) {
    super(label, value, 'textarea', key, required, defaultValue);
  }
}

export class SelectField extends FormField {
  constructor(
    public label: string,
    public key: string,
    public value: string,
    public defaultValue: string,
    public required: boolean,
    public placeholder: string,
    public disabled: boolean,
    public options: Array<{ label: string; value: string }>,
  ) {
    super(label, value, 'select', key, required, defaultValue);
  }
}
export class RadioField extends FormField {
  constructor(
    public label: string,
    public key: string,
    public value: string,
    public defaultValue: string,
    public required: boolean,
    public placeholder: string,
    public disabled: boolean,
    public options: Array<{ label: string; value: string }>,
  ) {
    super(label, value, 'radio', key, required, defaultValue);
  }
}

export type FormFieldTypes = InputField | TextareaField | SelectField | RadioField;

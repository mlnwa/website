type FormTypes = 'input' | 'textarea' | 'select' | 'radio';
class FormFiled {
  constructor(
    public label: string,
    public value: any,
    public type: FormTypes,
    public key: string,
    public required: boolean,
    public defaultValue: any,
  ) {}
}

export class InputFiled extends FormFiled {
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

export class TextareaFiled extends FormFiled {
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

export class SelectFiled extends FormFiled {
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
export class RadioFiled extends FormFiled {
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

export type FormFiledTypes = InputFiled | TextareaFiled | SelectFiled | RadioFiled;

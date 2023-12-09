type FormTypes = 'input' | 'textarea' | 'select' | 'radio';
class FormFiled {
  constructor(
    public label: string,
    public value: any,
    public type: FormTypes,
    public key: string,
    public required: boolean,
  ) {}
}

export class InputFiled extends FormFiled {
  constructor(
    public label: string,
    public key: string,
    public value: string,
    public required: boolean,
    public placeholder?: string,
    public disabled?: boolean,
  ) {
    super(label, value, 'input', key, required);
  }
}

export class TextareaFiled extends FormFiled {
  constructor(
    public label: string,
    public key: string,
    public value: string,
    public type: FormTypes,
    public required: boolean,
    public placeholder: string,
    public disabled: boolean,
  ) {
    super(label, value, 'textarea', key, required);
  }
}

export class SelectFiled extends FormFiled {
  constructor(
    public label: string,
    public key: string,
    public value: string,
    public required: boolean,
    public placeholder: string,
    public disabled: boolean,
    public options: Array<{ label: string; value: string }>,
  ) {
    super(label, value, 'select', key, required);
  }
}
export class RadioFiled extends FormFiled {
  constructor(
    public label: string,
    public key: string,
    public value: string,
    public required: boolean,
    public placeholder: string,
    public disabled: boolean,
    public options: Array<{ label: string; value: string }>,
  ) {
    super(label, value, 'radio', key, required);
  }
}

export type FormFiledTypes = InputFiled | TextareaFiled | SelectFiled | RadioFiled;

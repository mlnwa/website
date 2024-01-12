export enum FormFieldEnum {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  RADIO = 'radio',
}
export class FormField {
  private label: string;
  private key: string;
  private type: FormFieldEnum;
  private required: boolean;
  private disabled: boolean;
  private defaultValue: any;
  private placeholder: string;
  private value: any;
  constructor(builder: FormFieldBuilder) {
    this.label = builder.label;
    this.key = builder.key;
    this.type = builder.type;
    this.required = builder.required;
    this.disabled = builder.disabled;
    this.defaultValue = builder.defaultValue;
    this.value = builder.value;
  }
  getType() {
    return this.type;
  }
  getLabel() {
    return this.label;
  }
  getRequired() {
    return this.required;
  }
  getKey() {
    return this.key;
  }
  getDisabled() {
    return this.disabled;
  }
  getPlaceholder() {
    return this.placeholder;
  }
  getDefaultValue() {
    return this.defaultValue;
  }
  getValue() {
    return this.value;
  }
  setValue(value: any) {
    this.value = value;
  }
  static builderInput(label: string, key: string) {
    return new FormFieldBuilder(FormFieldEnum.INPUT, label, key);
  }
  static builderTextarea(label: string, key: string) {
    return new FormFieldBuilder(FormFieldEnum.TEXTAREA, label, key);
  }
  static buildSelect(label: string, key: string, options: any[]) {
    return new FormFieldBuilder(FormFieldEnum.SELECT, label, key).withOptions(options);
  }
  static buildRadio(label: string, key: string) {
    return new FormFieldBuilder(FormFieldEnum.RADIO, label, key);
  }
}
class FormFieldBuilder {
  public label: string;
  public type: FormFieldEnum;
  public key: string;
  public placeholder?: string;
  public options?: any[];
  public value?: any;
  public required?: boolean;
  public disabled?: boolean;
  public defaultValue?: any;

  constructor(type: FormFieldEnum, label: string, key: string) {
    this.label = label;
    this.type = type;
    this.key = key;
  }

  public withOptions(options: any[]): FormFieldBuilder {
    if (this.type !== FormFieldEnum.SELECT) throw new Error('Only select field can have options');
    this.options = options;
    return this;
  }
  public withRequired(required: boolean): FormFieldBuilder {
    this.required = required;
    return this;
  }

  public withDefaultValue(defaultValue: any): FormFieldBuilder {
    this.defaultValue = defaultValue;
    return this;
  }
  public withPlaceholder(placeholder: string): FormFieldBuilder {
    this.placeholder = placeholder;
    return this;
  }
  public build(): FormField {
    return new FormField(this);
  }
}

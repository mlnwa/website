export enum FormFieldEnum {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  RADIO = 'radio',
}
export class FormField<T> {
  private label: string;
  private key: string;
  private type: FormFieldEnum;
  private required: boolean;
  private disabled: boolean;
  private defaultValue: unknown;
  private placeholder: string;
  private value: T;
  private options: unknown[];
  constructor(builder: FormFieldBuilder<T>) {
    this.label = builder.label;
    this.key = builder.key;
    this.type = builder.type;
    this.required = builder.required;
    this.disabled = builder.disabled;
    this.defaultValue = builder.defaultValue;
    this.value = builder.value;
    this.options = builder.options;
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
  getOptions() {
    return this.options;
  }
  getValue() {
    return this.value;
  }
  setValue(value: any) {
    this.value = value;
  }
  static builderInput<T>(label: string, key: string) {
    return new FormFieldBuilder<T>(FormFieldEnum.INPUT, label, key);
  }
  static builderTextarea<T>(label: string, key: string) {
    return new FormFieldBuilder<T>(FormFieldEnum.TEXTAREA, label, key);
  }
  static buildSelect<T>(label: string, key: string, options: any[]) {
    return new FormFieldBuilder<T>(FormFieldEnum.SELECT, label, key).withOptions(options);
  }
  static buildRadio<T>(label: string, key: string) {
    return new FormFieldBuilder<T>(FormFieldEnum.RADIO, label, key);
  }
}
class FormFieldBuilder<T> {
  public label: string;
  public type: FormFieldEnum;
  public key: string;
  public placeholder?: string;
  public options?: unknown[];
  public value?: T;
  public required?: boolean;
  public disabled?: boolean;
  public defaultValue?: unknown;

  constructor(type: FormFieldEnum, label: string, key: string) {
    this.label = label;
    this.type = type;
    this.key = key;
  }

  public withOptions(options: unknown[]): FormFieldBuilder<T> {
    if (this.type !== FormFieldEnum.SELECT) throw new Error('Only select field can have options');
    this.options = options;
    return this;
  }

  public withRequired(required: boolean): FormFieldBuilder<T> {
    this.required = required;
    return this;
  }

  public withDefaultValue(defaultValue: unknown): FormFieldBuilder<T> {
    this.defaultValue = defaultValue;
    return this;
  }

  public withPlaceholder(placeholder: string): FormFieldBuilder<T> {
    this.placeholder = placeholder;
    return this;
  }
  public withDisabled(disabled: boolean): FormFieldBuilder<T> {
    this.disabled = disabled;
    return this;
  }

  public build(): FormField<T> {
    return new FormField(this);
  }
}

import { SemanticICONS } from 'semantic-ui-react';
import { FormFiledTypes, InputFiled } from './formFields';

export interface Panel {
  title: string;
  icon: SemanticICONS;
  content: FormFiledTypes[];
}
export const FormStruct = class {
  panelList: Panel[];
  constructor() {}
  generateFormData(formData: any) {}
  updateContent(panelIndex: number, contentIndex: number, value: any) {
    this.panelList[panelIndex].content[contentIndex].value = value;
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
};

export class BlogFilterForm extends FormStruct {
  constructor() {
    super();
    this.panelList = [
      {
        title: '筛选条件',
        icon: 'filter',
        content: [
          new InputFiled('用户名', 'name', 'z', false),
          new InputFiled('专栏', 'column', '', false),
          new InputFiled('类别', 'cat', '', false),
          new InputFiled('标签', 'label', '', false),
        ],
      },
      {
        title: '筛选条件',
        icon: 'filter',
        content: [
          new InputFiled('用户名', 'name', '', false),
          new InputFiled('专栏', 'column', '', false),
          new InputFiled('类别', 'cat', '', false),
          new InputFiled('标签', 'label', '', false),
        ],
      },
    ];
  }
}

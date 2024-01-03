import { SemanticICONS } from 'semantic-ui-react';
import { FormFieldTypes, InputField, TextareaField } from './formFields';

export interface Panel {
  title: string;
  icon: SemanticICONS;
  content: FormFieldTypes[];
}
export const FormStruct = class {
  panelList: Panel[];
  private changedKeysSet = new Set<string>();
  private isEdit = false;
  constructor() {}
  public generateFormData() {
    return this.panelList.reduce((acc, panel) => {
      panel.content.forEach((content) => {
        if (!this.changedKeysSet.has(content.key) && this.isEdit) return;
        Reflect.set(acc, content.key, content.value);
      });
      return acc;
    }, {});
  }
  public updateContent(panelIndex: number, contentIndex: number, value: any) {
    this.panelList[panelIndex].content[contentIndex].value = value;
    this.changedKeysSet.add(this.panelList[panelIndex].content[contentIndex].key);
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
  public insertFormData(formData: any) {
    this.panelList.forEach((item) => {
      item.content.forEach((val) => {
        if (Reflect.has(formData, val.key)) {
          Reflect.set(val, 'value', formData[val.key]);
        }
      });
    });
    this.changedKeysSet.clear();
    this.isEdit = true;
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
  public resetFormData() {
    this.panelList.forEach((item) => {
      item.content.forEach((val) => {
        val.value = val.defaultValue;
      });
    });
    this.changedKeysSet.clear();
    this.isEdit = false;
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
          new InputField('用户名', 'name', '', '', false),
          new InputField('专栏', 'column', '', '', false),
          new InputField('类别', 'cat', '', '', false),
          new InputField('标签', 'label', '', '', false),
        ],
      },
    ];
  }
}
export class BlogForm extends FormStruct {
  constructor() {
    super();
    this.panelList = [
      {
        title: '基础信息',
        icon: 'info',
        content: [
          new InputField('标题', 'title', '', '', true),
          new InputField('作者', 'author', '', '', true),
          new InputField('专栏', 'column', '', '', true),
          new InputField('类别', 'cat', '', '', true),
          new InputField('标签', 'label', '', '', true),
          new InputField('摘要', 'summary', '', '', true),
          new InputField('封面', 'cover', '', '', true),
          new InputField('内容', 'content', '', '', true),
        ],
      },
    ];
  }
}
export class CategoryForm extends FormStruct {
  constructor() {
    super();
    this.panelList = [
      {
        title: '基础信息',
        icon: 'info',
        content: [
          new InputField('类别名称', 'name', '', '', true),
          new InputField('描述', 'description', '', '', false),
        ],
      },
    ];
  }
}

export class CategoryFilterForm extends FormStruct {
  constructor() {
    super();
    this.panelList = [
      {
        title: '筛选条件',
        icon: 'filter',
        content: [new InputField('类别名称', 'name', '', '', false)],
      },
    ];
  }
}
export class ColumnForm extends FormStruct {
  constructor() {
    super();
    this.panelList = [
      {
        title: '基础信息',
        icon: 'info',
        content: [
          new InputField('专栏名称', 'name', '', '', true),
          new InputField('描述', 'description', '', '', false),
        ],
      },
    ];
  }
}
export class ColumnFilterForm extends FormStruct {
  constructor() {
    super();
    this.panelList = [
      {
        title: '筛选条件',
        icon: 'filter',
        content: [new InputField('专栏名称', 'name', '', '', false)],
      },
    ];
  }
}
export class TagForm extends FormStruct {
  constructor() {
    super();
    this.panelList = [
      {
        title: '基础信息',
        icon: 'info',
        content: [
          new InputField('标签名称', 'name', '', '', true),
          new InputField('描述', 'description', '', '', false),
        ],
      },
    ];
  }
}
export class TagFilterForm extends FormStruct {
  constructor() {
    super();
    this.panelList = [
      {
        title: '筛选条件',
        icon: 'filter',
        content: [new InputField('标签名称', 'name', '', '', false)],
      },
    ];
  }
}

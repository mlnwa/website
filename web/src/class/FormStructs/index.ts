import { SemanticICONS } from 'semantic-ui-react';
import { FormFiledTypes, InputFiled, TextareaFiled } from './formFields';

export interface Panel {
  title: string;
  icon: SemanticICONS;
  content: FormFiledTypes[];
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
          new InputFiled('用户名', 'name', '', '', false),
          new InputFiled('专栏', 'column', '', '', false),
          new InputFiled('类别', 'cat', '', '', false),
          new InputFiled('标签', 'label', '', '', false),
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
          new InputFiled('标题', 'title', '', '', true),
          new InputFiled('作者', 'author', '', '', true),
          new InputFiled('专栏', 'column', '', '', true),
          new InputFiled('类别', 'cat', '', '', true),
          new InputFiled('标签', 'label', '', '', true),
          new InputFiled('摘要', 'summary', '', '', true),
          new InputFiled('封面', 'cover', '', '', true),
          new InputFiled('内容', 'content', '', '', true),
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
          new InputFiled('类别名称', 'name', '', '', true),
          new InputFiled('描述', 'description', '', '', false),
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
        content: [new InputFiled('类别名称', 'name', '', '', false)],
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
          new InputFiled('专栏名称', 'name', '', '', true),
          new InputFiled('描述', 'description', '', '', false),
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
        content: [new InputFiled('专栏名称', 'name', '', '', false)],
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
          new InputFiled('标签名称', 'name', '', '', true),
          new InputFiled('描述', 'description', '', '', false),
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
        content: [new InputFiled('标签名称', 'name', '', '', false)],
      },
    ];
  }
}

import { SemanticICONS } from 'semantic-ui-react';
import { FormField } from './formField';

export interface Panel {
  title: string;
  icon: SemanticICONS;
  content: FormField[];
}

/**
 * @todo 重构成hook
 */
export const FormStruct = class {
  panelList: Panel[];
  private changedKeysSet = new Set<string>();
  private isEdit = false;
  constructor() {}
  public generateFormData() {
    return this.panelList.reduce((acc, panel) => {
      panel.content.forEach((content) => {
        if (!this.changedKeysSet.has(content.getKey()) && this.isEdit) return;
        Reflect.set(acc, content.getKey(), content.getValue());
      });
      return acc;
    }, {});
  }
  public updateContent(panelIndex: number, contentIndex: number, value: any) {
    this.panelList[panelIndex].content[contentIndex].setValue(value);
    this.changedKeysSet.add(this.panelList[panelIndex].content[contentIndex].getKey());
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
  public insertFormData(formData: any) {
    this.panelList.forEach((item) => {
      item.content.forEach((val) => {
        if (Reflect.has(formData, val.getKey())) {
          Reflect.set(val, 'value', formData[val.getKey()]);
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
        val.setValue(val.getDefaultValue());
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
          FormField.builderInput('用户名', 'userName').build(),
          FormField.builderInput('专栏', 'columnId').build(),
          FormField.builderInput('类别', 'categoryId').build(),
          FormField.builderInput('标签', 'tagId').build(),
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
          FormField.builderInput('专栏', 'columnId').build(),
          FormField.builderInput('类别', 'categoryId').build(),
          FormField.builderInput('标签', 'tagIds').build(),
          FormField.builderInput('摘要', 'abstract').build(),
          FormField.builderInput('封面', 'imgUrl').build(),
        ],
      },
      {
        title: '博客属性',
        icon: 'radio',
        content: [
          FormField.buildRadio('开启评论', 'enableComment').build(),
          FormField.buildRadio('开启赞赏', 'enablePraise').build(),
          FormField.buildRadio('开启版权声明', 'enableCopyright').build(),
          FormField.buildRadio('开启推荐', 'enableRecommend').build(),
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
          FormField.builderInput('类别名称', 'name').build(),
          FormField.builderInput('描述', 'description').build(),
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
        content: [FormField.builderInput('类别名称', 'name').build()],
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
          FormField.builderInput('专栏名称', 'name').build(),
          FormField.builderInput('描述', 'description').build(),
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
        content: [FormField.builderInput('专栏名称', 'name').build()],
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
          FormField.builderInput('标签名称', 'name').build(),
          FormField.builderInput('描述', 'description').build(),
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
        content: [FormField.builderInput('标签名称', 'name').build()],
      },
    ];
  }
}

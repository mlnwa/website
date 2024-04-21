import { StringUtil } from './StringUtil';
import { TypeUtil } from './TypeUtil';

export class JSONUtil {
  static toArray<T>(json: string, Class: T, defaultValue: Array<T> = []): Array<T> {
    if (StringUtil.isEmpty(json)) {
      return defaultValue;
    }
    let res: Array<T> = JSONUtil.parse(json);
    if (!TypeUtil.isArray(res)) {
      return defaultValue;
    }
    let formattedRes: Array<T> = res.map((item: any) => {
      return Object.assign({}, Class, item);
    });
    return formattedRes;
  }

  static toObject<T>(json: string, Class: { new (): T }, defaultValue: T = null): T {
    if (StringUtil.isEmpty(json)) {
      return defaultValue;
    }
    let object: T = JSONUtil.parse(json);
    if (!TypeUtil.isObject(object)) {
      return defaultValue;
    }
    let res = new Class();
    Object.keys(res).forEach((key) => {
      if (object.hasOwnProperty(key)) {
        res[key] = object[key];
      }
    });
    return res;
  }

  private static parse(json: string): any {
    try {
      return JSONUtil.parse(JSON.parse(json));
    } catch (error) {
      return json;
    }
  }
}

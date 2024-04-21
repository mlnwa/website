import { TypeUtil } from './TypeUtil';

export class StringUtil {
  /**
   * 判断字符串是否为空
   * @param str
   */
  static isEmpty(str: string): boolean {
    if (!TypeUtil.isString(str)) {
      return false;
    }
    str = str.trim();
    return str === '' || str === 'undefined' || str === 'null';
  }
}

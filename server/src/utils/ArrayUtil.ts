export class ArrayUtil {
  static isEmpty(array: any[]): boolean {
    return array.length == 0;
  }

  static isArray(array: any): boolean {
    return array instanceof Array;
  }
}

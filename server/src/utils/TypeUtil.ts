function isType(type: string) {
  return function (data: any): boolean {
    const toStringType = Object.prototype.toString.call(data) as string;
    return toStringType.substring(8, toStringType.length - 1) == type;
  };
}
function isJSONType(type: string) {
  return function (data: any): boolean {
    try {
      data = JSON.parse(data);
      return isType(type)(data);
    } catch (error) {
      return false;
    }
  };
}
export const TypeUtil = class {
  static isArray = isType('Array');
  static isString = isType('String');
  static isObject = isType('Object');
  static isUndefined = isType('Undefined');
  static isNumber = isType('Number');

  static isJSONArray = isJSONType('Array');
  static isJSONString = isJSONType('String');
  static isJSONObject = isJSONType('Object');
};

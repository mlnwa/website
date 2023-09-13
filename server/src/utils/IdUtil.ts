export class IdUtil {
  static uuid(format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'): string {
    return format.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  static uuidOfNumber(length = 16): string {
    let uuid = '';
    for (let i = 0; i < length; i++) {
      const digit = Math.floor(Math.random() * 10);
      uuid += digit.toString();
    }
    return uuid;
  }
}

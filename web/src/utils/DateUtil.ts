type UnitType = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
type MatchValue = {
  getData: (thisArg: Date) => number;
  setData: (thisArg: Date, value: number) => number;
};
export const DateUtil = class {
  date: Date;
  private unitMatch: Record<UnitType, MatchValue> = {
    milliseconds: {
      getData: Function.prototype.call.bind(Date.prototype.getMilliseconds),
      setData: Function.prototype.call.bind(Date.prototype.setMilliseconds),
    },
    seconds: {
      getData: Function.prototype.call.bind(Date.prototype.getSeconds),
      setData: Function.prototype.call.bind(Date.prototype.setSeconds),
    },
    minutes: {
      getData: Function.prototype.call.bind(Date.prototype.getMinutes),
      setData: Function.prototype.call.bind(Date.prototype.setMinutes),
    },
    hours: {
      getData: Function.prototype.call.bind(Date.prototype.getHours),
      setData: Function.prototype.call.bind(Date.prototype.setHours),
    },
    days: {
      getData: Function.prototype.call.bind(Date.prototype.getDate),
      setData: Function.prototype.call.bind(Date.prototype.setDate),
    },
    weeks: {
      getData: Function.prototype.call.bind(Date.prototype.getDate),
      setData: Function.prototype.call.bind(Date.prototype.setDate),
    },
    months: {
      getData: Function.prototype.call.bind(Date.prototype.getMonth),
      setData: Function.prototype.call.bind(Date.prototype.setMonth),
    },
    years: {
      getData: Function.prototype.call.bind(Date.prototype.getFullYear),
      setData: Function.prototype.call.bind(Date.prototype.setFullYear),
    },
  };
  constructor(date: any) {
    this.date = new Date(date);
  }
  format(formatString = 'YYYY-MM-DD HH:mm:ss') {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();
    const hours = this.date.getHours();
    const minutes = this.date.getMinutes();
    const seconds = this.date.getSeconds();

    const formattedString = formatString
      .replace('YYYY', String(year))
      .replace('MM', String(month).padStart(2, '0'))
      .replace('DD', String(day).padStart(2, '0'))
      .replace('HH', String(hours).padStart(2, '0'))
      .replace('mm', String(minutes).padStart(2, '0'))
      .replace('ss', String(seconds).padStart(2, '0'));

    return formattedString;
  }
  add(value: number, unit?: UnitType) {
    unit = unit ?? 'days';
    value = unit === 'weeks' ? value * 7 : value;
    const setData = this.unitMatch[unit].setData;
    const getData = this.unitMatch[unit].getData;
    setData(this.date, getData(this.date) + value);
    return this;
  }
  convertToTimeAgo() {
    const timeAgoMillis = new Date().getTime() - this.date.getTime();

    const secondsAgo = Math.floor(timeAgoMillis / 1000);
    if (secondsAgo < 60) {
      return '刚刚';
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return minutesAgo + '分钟前';
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return hoursAgo + '小时前';
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
      return daysAgo + '天前';
    }

    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
      return weeksAgo + '周前';
    }

    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) {
      return monthsAgo + '个月前';
    }

    const yearsAgo = Math.floor(daysAgo / 365);
    return yearsAgo + '年前';
  }
  static day(value?: any) {
    return new DateUtil(value ?? Date.now());
  }
};

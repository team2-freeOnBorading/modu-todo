const options: Record<string, string> = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short', timeZone: 'UTC' };
export const dateToString = (date: Date | string): string => {
  return typeof date === 'string' ? new Date(date).toLocaleString('ko-KR', options) : date.toLocaleString('ko-KR', options);
};

export const getUTCDate = (date: Date | null | undefined): Date | null => {
  if (date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  } else {
    return null;
  }
};

export const getMaxDate = (date: Date | null): Date | null => {
  if (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 32, 59, 59);
  } else {
    return null;
  }
};

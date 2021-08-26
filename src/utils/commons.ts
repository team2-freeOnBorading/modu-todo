const options: Record<string, string> = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
export const dateToString = (date: Date | string): string => {
  return typeof date === 'string' ? new Date(date).toLocaleString('ko-KR', options) : date.toLocaleString('ko-KR', options);
};

const options: Record<string, string> = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
export const dateToString = (date: Date): string => date.toLocaleString('ko-KR', options);

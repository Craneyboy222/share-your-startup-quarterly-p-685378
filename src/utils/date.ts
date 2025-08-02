import { format, parseISO } from 'date-fns';

export const formatDate = (date: Date, dateFormat: string = 'yyyy-MM-dd'): string => {
  return format(date, dateFormat);
};

export const parseDate = (dateString: string, dateFormat: string = 'yyyy-MM-dd'): Date => {
  return parseISO(dateString);
};
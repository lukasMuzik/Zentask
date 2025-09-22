import {format} from 'date-fns';
import {cs, enUS} from 'date-fns/locale';

const localeMap = {
  cs,
  'cs-CZ': cs,
  en: enUS,
  'en-US': enUS,
} as const;

type SupportedLocale = keyof typeof localeMap;

interface DateFormatterOptions {
  locale?: SupportedLocale;
  date?: Date;
  dateFormat?: string;
}

export function getFormattedDate(options?: DateFormatterOptions) {
  const {locale = 'cs', date = new Date(), dateFormat = 'd. MMMM yyyy'} = options || {};
  const localeObject = localeMap[locale as SupportedLocale] || cs;

  return format(date, dateFormat, {locale: localeObject});
}

export function getShortDate(options?: Omit<DateFormatterOptions, 'dateFormat'>) {
  return getFormattedDate({...options, dateFormat: 'd.M.yyyy'});
}

export function getTimeOnly(options?: Omit<DateFormatterOptions, 'dateFormat'>) {
  return getFormattedDate({...options, dateFormat: 'HH:mm'});
}

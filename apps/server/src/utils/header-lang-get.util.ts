import { Language } from '../common/enum/language.enum';

export const getLang = (acceptLanguage: string): Language => {
  if (
    acceptLanguage &&
    Object.values(Language).includes(acceptLanguage.toLowerCase() as Language)
  )
    return acceptLanguage.toLowerCase() as Language;
  return Language.UK;
};

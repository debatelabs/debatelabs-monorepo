import common from './common.json';
import auth from './auth.json';
import validation from './validation.json';
import { LocaleNamespaces } from '~/shared/types/i18n.types';

const en = {
  translations: {
    common,
    auth,
    validation
  }
} satisfies LocaleNamespaces;

export default en;

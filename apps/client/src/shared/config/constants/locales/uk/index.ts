import common from './common.json';
import auth from './auth.json';
import validation from './validation.json';
import { LocaleNamespaces } from '~/shared/model/types/i18n.types';

const uk = {
  translations: {
    common,
    auth,
    validation
  }
} satisfies LocaleNamespaces;

export default uk;

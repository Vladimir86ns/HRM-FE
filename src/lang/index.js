/**
 * App Language Provider
 * Add more locales here
 */
import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import srLang from './entries/sr_SR';

const AppLocale = {
    en: enLang,
    sr: srLang,
};

addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.sr.data);

export default AppLocale;

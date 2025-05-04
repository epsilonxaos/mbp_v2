import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n.use(HttpBackend) // carga los archivos desde el servidor
    .use(LanguageDetector) // detecta el idioma del navegador
    .use(initReactI18next) // conecta con react
    .init({
        fallbackLng: 'es', // idioma por defecto
        debug: false,
        interpolation: {
            escapeValue: false, // react ya hace escaping
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // dónde están tus archivos
        },
        ns: ['common'], // puedes agregar más namespaces
        defaultNS: 'common',
    });

export default i18n;

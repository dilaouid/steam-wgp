const availableLanguages = ['fr', 'en'];

export const getBrowserLanguage = () => {
    const language = localStorage.getItem('i18nextLng');
    if (language && availableLanguages.includes(language)) {
        return language;
    } else {
        localStorage.removeItem('i18nextLng');
    }

    const browserLanguage = navigator.language.split('-')[0];
    if (availableLanguages.includes(browserLanguage)) {
        localStorage.setItem('i18nextLng', browserLanguage);
        return browserLanguage;
    }

    localStorage.setItem('i18nextLng', 'en');
    return 'en';
};
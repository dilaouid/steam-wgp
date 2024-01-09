const availableLanguages = ['fr', 'en'];

export const getBrowserLanguage = () => {
    const language = localStorage.getItem('language');
    if (language && availableLanguages.includes(language)) {
        return language;
    } else {
        localStorage.removeItem('language');
    }

    const browserLanguage = navigator.language.split('-')[0];
    if (availableLanguages.includes(browserLanguage)) {
        return browserLanguage;
    }

    return 'en';
};
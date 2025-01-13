const availableLanguages = ["en", "fr", "jp", "es", "de"]

export const loadMarkdown = async (i18n: string, page: 'legal' | 'cgu') => {
    const language = availableLanguages.includes(i18n) ? i18n : "fr";
    const path = `/locales/${language}/${page}.md`;
    try {
        const response = await fetch(path);
        return await response.text();
    } catch (error) {
        console.error("Failed to load markdown file", error);
        return null;
    }
};
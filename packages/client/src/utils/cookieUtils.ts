export const getCookieValue = (name: string): string | undefined => {
    const matches = document.cookie.match(new RegExp(
        // eslint-disable-next-line no-useless-escape
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const setCookieValue = (name: string, value: string, options: { path: string }): void => {
    const updatedCookie = `${name}=${encodeURIComponent(value)}; path=${options.path}`;
    document.cookie = updatedCookie;
};

export const deleteCookie = (name: string): void => {
    setCookieValue(name, '', { path: '/' });
};
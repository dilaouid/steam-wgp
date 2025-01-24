const env = import.meta.env;

export const BASE_URL: string = env.VITE_BASE_URL;
export const ELEMENTS_PER_PAGE: number = env.VITE_STEAMDERS_PER_PAGE;
export const SAME_SITE: boolean = env.VITE_SAME_SITE;
export const MODE: 'development' | 'production' = env.VITE_MODE;
export const BASE_WS_URL: string = env.VITE_BASE_WS_URL;
export const DASHBOARD_API: string = env.VITE_BASE_DASHBOARD_URL;
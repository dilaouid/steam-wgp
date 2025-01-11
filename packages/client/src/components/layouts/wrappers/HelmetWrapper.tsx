import { useTranslation } from 'react-i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface HelmetWrapperProps {
    keyPrefix: string;
    children: React.ReactNode;
    noindex: boolean;
}

export const HelmetWrapper: React.FC<HelmetWrapperProps> = ({ keyPrefix, children, noindex }) => {
    const { t } = useTranslation('global/meta', { keyPrefix });
    document.title = t('title');
    return (
        <HelmetProvider i18nIsDynamicList={true}>
            <Helmet>
                <title>{ t('title') }</title>
                <meta name="description" content={ t('description') } />
                { noindex && <meta name="robots" content="noindex, nofollow" /> }
            </Helmet>
            {children}
        </HelmetProvider>
    );
};
import { useTranslation } from 'react-i18next';

export default function HeadingMottoComponent() {
    const { t } = useTranslation();
    return (
        <p className="fw-bold text-primary mb-2">{t('motto')}</p>
    );
}
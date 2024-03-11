import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const HeadingSubtitle = styled.h4`
    margin-bottom: 37px;
`;

export default function HeadingSubtitleComponent() {
    const { t } = useTranslation();
    return (
        <HeadingSubtitle className="font-monospace text-center text-secondary text-opacity-50">
            {t('subtitle')}
        </HeadingSubtitle>
    );
}
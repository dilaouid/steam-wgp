import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Disclaimer = styled.p`
    font-size: 9px;
`;

export default function DisclaimerComponent() {
    const { t } = useTranslation(); 
    return (
        <Disclaimer>{t('disclaimer')}</Disclaimer>
    );
}
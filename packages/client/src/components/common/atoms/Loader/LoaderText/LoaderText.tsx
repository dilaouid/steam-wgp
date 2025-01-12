import { useTranslation } from "react-i18next";
import { StyledLoaderText } from ".";

export const LoaderText: React.FC = () => {
    const { t } = useTranslation('translation');

    return <StyledLoaderText className="text-warning">{ t('loading') }</StyledLoaderText>
}
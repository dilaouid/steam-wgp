import { useTranslation } from "react-i18next";
import { BsController } from "react-icons/bs";

import { Label } from "./FormLabel.styled";

export const FormLabel: React.FC = () => {
    const { t } = useTranslation('pages/steamders', { keyPrefix: 'left_column.form' });

    return (<Label><BsController /> | { t('name') }</Label>)
};
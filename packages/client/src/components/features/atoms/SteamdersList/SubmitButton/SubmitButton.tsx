import { Button } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { BsPersonHeart } from "react-icons/bs"

import { useCreateSteamder } from "@core/hooks/useCreateSteamder";

export const SubmitButton: React.FC<{ name: string }> = ({ name }) => {
    const { t } = useTranslation('pages/steamders', { keyPrefix: 'left_column.form' });
    const createSteamderMutation = useCreateSteamder();

    return (
        <Button variant="info" type="submit" disabled={createSteamderMutation.isPending || (name.length > 0 && name.length < 3) }>
            <BsPersonHeart /> | { createSteamderMutation.isPending ? t('loading') : t('submit') }
        </Button>
    )
}
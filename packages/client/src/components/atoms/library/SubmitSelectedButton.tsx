import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BsCheckAll } from "react-icons/bs";

interface SubmitSelectedButtonProps {
    count: number;
}

export const SubmitSelectedButton: React.FC<SubmitSelectedButtonProps> = ({ count }) => {
    const { t } = useTranslation('pages/library', { keyPrefix: 'left_column.submit_selected_button' });
    const message = count === 0 ? t('disabled') : t('enabled');
    return (
        <Button
            variant={count === 0 ? 'secondary' : 'info'}
            disabled={count === 0}
        >
            { count > 0 && <BsCheckAll /> }
            { message }
        </Button>
    );
};
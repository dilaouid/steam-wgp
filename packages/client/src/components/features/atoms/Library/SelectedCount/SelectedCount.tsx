import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { SelectedCountProps, StyledIcon } from ".";

export const SelectedCount: React.FC<SelectedCountProps> = ({ count, type }) => {
    const { t } = useTranslation('pages/library', { keyPrefix: 'left_column.selected_count' });
    const message = type === 'public' ? t('public', { count }) : t('private', { count });
    return (
        <Col className="user-select-none">
            <p className={count > 0 ? 'fw-bolder text-info' : 'text-body-secondary'}>
                { count > 0 && <StyledIcon /> }
                { message }
            </p>
        </Col>
    );
};
import { Button, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BsLock } from "react-icons/bs";

const CannotJoinTooltip = (message: string) =>
    <Tooltip id="cannot-join-tooltip">
        { message }
    </Tooltip>;

export const UnjoinableButton: React.FC = () => {
    const { t } = useTranslation('pages/steamders', { keyPrefix: 'right_column.table' });

    return (
        <OverlayTrigger placement="right" overlay={CannotJoinTooltip(t('tooltip'))} trigger={['hover', 'focus']}>
            <Col className="text-center" sm={'auto'}>
                <Button size="sm" variant="secondary" disabled><BsLock /> | {t('buttons.unavailable')}</Button>
            </Col>
        </OverlayTrigger>
    )
};
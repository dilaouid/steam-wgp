import { Link } from "@tanstack/react-router"
import { Button, Col } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { BsPersonPlus } from "react-icons/bs"

export const JoinButton: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useTranslation('pages/steamders', { keyPrefix: 'right_column.table.buttons' });
    return (
        <Col className="text-center" sm={'auto'}>
            <Link to={`/steamder/${id}`}>
                <Button size="sm" variant="info"><BsPersonPlus /> | { t('join') }</Button>
            </Link>
        </Col>
    )
}
import { Link } from "@tanstack/react-router"
import { Button, Col } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import { BsBoxArrowInDown, BsDoorOpen } from "react-icons/bs"

export const MySteamderButtons = ({ id }: { id: string }) => {
    const { t } = useTranslation('pages/steamders', { keyPrefix: 'right_column.table.buttons' });
    return (
        <>
            <Col className="text-center" sm={'auto'}>
                <Link to={`/steamder/${id}`}>
                    <Button size="sm" variant="primary"><BsBoxArrowInDown /> | { t('open') }</Button>
                </Link>
            </Col>
            <Col className="text-center" sm={'auto'}>
                <Button size="sm" variant="danger"><BsDoorOpen /> | { t('leave') }</Button>
            </Col>
        </>
    )
}
import { Button, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsLock } from "react-icons/bs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CannotJoinTooltip = (props: any) =>
    <Tooltip id="cannot-join-tooltip" {...props}>
        Vous ne pouvez être que dans une Steamder à la fois
    </Tooltip>;

export const UnjoinableButton: React.FC = () => {
    return (
        <OverlayTrigger placement="right" overlay={CannotJoinTooltip} trigger={['hover', 'focus']}>
            <Col className="text-center" sm={'auto'}>
                <Button size="sm" variant="secondary" disabled><BsLock /> | Injoignable</Button>
            </Col>
        </OverlayTrigger>
    )
};
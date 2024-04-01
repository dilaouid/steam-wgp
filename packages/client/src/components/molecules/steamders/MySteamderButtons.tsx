import { Link } from "@tanstack/react-router"
import { Button, Col } from "react-bootstrap"
import { BsBoxArrowInDown, BsDoorOpen } from "react-icons/bs"

export const MySteamderButtons = ({ id }: { id: string }) => {
    return (
        <>
            <Col className="text-center" sm={'auto'}>
                <Link to={`/steamder/${id}`}>
                    <Button size="sm" variant="primary"><BsBoxArrowInDown /> | Ouvrir</Button>
                </Link>
            </Col>
            <Col className="text-center" sm={'auto'}>
                <Button size="sm" variant="danger"><BsDoorOpen /> | Quitter</Button>
            </Col>
        </>
    )
}
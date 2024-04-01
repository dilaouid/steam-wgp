import { Link } from "@tanstack/react-router"
import { Button, Col } from "react-bootstrap"
import { BsPersonPlus } from "react-icons/bs"

export const JoinButton: React.FC<{ id: string }> = ({ id }) => {
    return (
        <Col className="text-center" sm={'auto'}>
            <Link to={`/steamder/${id}`}>
                <Button size="sm" variant="info"><BsPersonPlus /> | Rejoindre</Button>
            </Link>
        </Col>
    )
}
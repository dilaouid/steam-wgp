import { Col } from "react-bootstrap"
import { CoverImageSwipe } from "../../../atoms/steamder/game/CoverImageSwipe";

export const GameColumn = () => {
    return (
        <Col className="text-end">
            <CoverImageSwipe />
        </Col>
    )
}
import { Col } from "react-bootstrap"
import { CoverImageSwipe } from "./CoverImageSwipe";

export const GameColumn = () => {
    return (
        <Col className="text-center text-lg-end">
            <CoverImageSwipe />
        </Col>
    )
}
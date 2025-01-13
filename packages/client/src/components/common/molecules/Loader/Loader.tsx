import { Col, Row } from "react-bootstrap";

import { LoaderText, LottieLoader } from "@ui/atoms";

export const Loader: React.FC = () => {
    return (
        <Row className="g-0 justify-content-center align-items-center">
            <Col className="text-center align-self-center" sm={"auto"}>
                <LoaderText />
                <LottieLoader />
            </Col>
        </Row>
    )
}
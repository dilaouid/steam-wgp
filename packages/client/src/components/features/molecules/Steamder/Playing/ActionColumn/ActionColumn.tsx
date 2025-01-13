import { Col } from "react-bootstrap";

import { LikeButton, PassButton } from "@features/atoms/Steamder";
import { SwipedGamesBox } from "@features/molecules/Steamder/Playing/SwipedGamesBox";

export const ActionColumn = () => {
    return (
        <Col>
            <LikeButton />
            <PassButton />
            <SwipedGamesBox />
        </Col>
    )
};
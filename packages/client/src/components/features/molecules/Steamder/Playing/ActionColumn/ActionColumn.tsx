import { Col } from "react-bootstrap";

import { LikeButton, PassButton } from "@features/atoms/Steamder";

import { SwipedGamesBox } from "../SwipedGamesBox";

export const ActionColumn = () => {
    return (
        <Col>
            <LikeButton />
            <PassButton />
            <SwipedGamesBox />
        </Col>
    )
};
import { Col } from "react-bootstrap";

import { LikeButton } from "@features/atoms/Steamder/game/LikeButton/LikeButton";
import { PassButton } from "@features/atoms/Steamder/game/PassButton/PassButton";

import { SwipedGamesBox } from "./SwipedGamesBox";

export const ActionColumn = () => {
    return (
        <Col>
            <LikeButton />
            <PassButton />
            <SwipedGamesBox />
        </Col>
    )
};
import { Col } from "react-bootstrap";
import { LikeButton } from "components/features/atoms/Steamder/game/LikeButton/LikeButton";
import { PassButton } from "components/features/atoms/Steamder/game/PassButton/PassButton";
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
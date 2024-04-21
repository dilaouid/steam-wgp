import { Col } from "react-bootstrap";
import { LikeButton } from "../../../atoms/steamder/game/LikeButton";
import { PassButton } from "../../../atoms/steamder/game/PassButton";
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
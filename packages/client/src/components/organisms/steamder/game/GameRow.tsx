import { Row } from "react-bootstrap";
import { GameColumn } from "../../../molecules/steamder/game/GameColumn";
import { ActionColumn } from "../../../molecules/steamder/game/ActionColumn";

export const GameRow = () => {
    return (
        <Row className="g-0">
            <GameColumn />
            <ActionColumn />
        </Row>
    )
};
import { Row } from "react-bootstrap";
import { GameColumnPlay, ActionColumn } from "@features/molecules/Steamder/Playing";

export const GameRow = () => {
    return (
        <Row className="g-0">
            <GameColumnPlay />
            <ActionColumn />
        </Row>
    )
};
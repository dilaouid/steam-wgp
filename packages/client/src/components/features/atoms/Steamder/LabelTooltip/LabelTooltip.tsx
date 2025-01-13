import { Tooltip } from "react-bootstrap";

export const LabelTooltip = (message: string) => 
    <Tooltip id="common-games-tooltip">
        { message }
    </Tooltip>;
import styled from "styled-components";
import IconCardComponent from "./IconCard";
import GameCoverComponent from "./GameCover";
import { Library } from "../../../context";
import { useContext } from "react";

const GameCard = styled.div<{ delay: string }>`
  --animate-duration: ${(props) => props.delay}s;
`;

interface GameCardComponentProps {
    id: string;
    delay: string;
    hidden: boolean;
    isSelected: boolean;
    toggle: (id: string, selected: string[]) => string[];
}

const defineClassNames = (selected: boolean): string => {
    if (selected) {
        return "d-xxl-flex align-self-center justify-content-xxl-center align-items-xxl-center";
    }
    return "";
};

export default function GameCardComponent({ id, delay, hidden, isSelected, toggle }: GameCardComponentProps) {
    const { library } = useContext(Library.Context)!;
    return(
        <GameCard
            className={`col-auto ${defineClassNames(isSelected)} animate__animated animate__zoomIn`}
            delay={delay}
            onClick={() => { toggle(id, library?.selected || []); }}
        >
            <IconCardComponent hidden={hidden} isSelected={isSelected} />
            <GameCoverComponent id={id} hidden={hidden} isSelected={isSelected} />
    </GameCard>)
}
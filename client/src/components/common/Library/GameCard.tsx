import styled from "styled-components";
import IconCardComponent from "./IconCard";
import GameCoverComponent from "./GameCover";

const GameCard = styled.div<{ delay: string }>`
  --animate-duration: ${(props) => props.delay}s;
`;

interface GameCardComponentProps {
    id: string;
    delay: string;
    hidden: boolean;
    selected: boolean;
    toggle: (id:string) => void;
}

const defineClassNames = (selected: boolean): string => {
    if (selected) {
        return "d-xxl-flex align-self-center justify-content-xxl-center align-items-xxl-center";
    }
    return "";
};

export default function GameCardComponent({ id, delay, hidden, selected, toggle }: GameCardComponentProps) {
    return(
        <GameCard
            className={`col-auto ${defineClassNames(selected)} animate__animated animate__zoomIn`}
            delay={delay}
            onClick={() => { toggle(id); }}
        >
            <IconCardComponent hidden={hidden} selected={selected} />
            <GameCoverComponent id={id} hidden={hidden} selected={selected} />
    </GameCard>)
}
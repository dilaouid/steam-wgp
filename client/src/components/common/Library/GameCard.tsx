import styled from "styled-components";
import GameCoverComponent from "./GameCover";
import { Library } from "../../../context";
import { useContext } from "react";
import { SelectedIcon } from "../Icons/SelectedIcon";
import { HiddenIcon } from "../Icons/HiddenIcon";

const GameCard = styled.div<{ delay: string }>`
  --animate-duration: ${(props) => props.delay}s;
`;

interface GameCardComponentProps {
    id: string;
    delay: string;
    hide: boolean;
}

const defineClassNames = (selected: boolean): string => {
    if (selected)
        return "d-xxl-flex align-self-center justify-content-xxl-center align-items-xxl-center";
    return "";
};

export default function GameCardComponent({ id, delay, hide }: GameCardComponentProps) {
    const { setLibrary, library } = useContext(Library.Context)!;

    const toggle = (id: string, selected: string[]) => {
        // add or remove the game from the selected array in the library context
        const newSelected: string[] = selected.includes(id) ? selected.filter((gameId: string) => gameId !== id) : [...selected, id];
        setLibrary({ games: library?.games ?? [], selected: newSelected });
    };

    const isSelected = library?.selected?.includes(id) || false;
    const showHide = isSelected ? !hide : hide;

    return(
        <GameCard
            className={`col-auto ${defineClassNames(isSelected)} animate__animated animate__zoomIn`}
            delay={delay}
            onClick={() => { toggle(id, library?.selected || []); }}
        >
            {isSelected && <SelectedIcon />}
            {showHide && <HiddenIcon selected={isSelected} />}

            <GameCoverComponent id={id} hide={isSelected ? !hide : hide} isSelected={isSelected} />
    </GameCard>)
}
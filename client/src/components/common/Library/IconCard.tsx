import { SelectedIcon } from "../Icons/SelectedIcon";
import { HiddenIcon } from "../Icons/HiddenIcon";

interface IconCardComponentProps {
    hidden: boolean;
    selected: boolean;
}

export default function IconCardComponent({ hidden, selected }: IconCardComponentProps) {
    return (
        <div>
            {selected && <SelectedIcon />}
            {hidden && <HiddenIcon selected={selected} />}
        </div>
    );
}
import { SelectedIcon } from "../Icons/SelectedIcon";
import { HiddenIcon } from "../Icons/HiddenIcon";

interface IconCardComponentProps {
    hidden: boolean;
    isSelected: boolean;
}

export default function IconCardComponent({ hidden, isSelected }: IconCardComponentProps) {
    return (
        <div>
            {isSelected && <SelectedIcon />}
            {hidden && <HiddenIcon selected={isSelected} />}
        </div>
    );
}
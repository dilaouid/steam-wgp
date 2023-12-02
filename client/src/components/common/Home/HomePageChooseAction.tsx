import CapslockIcon from "../Icons/CapslockIcon";
import DoorOpenIcon from "../Icons/DoorOpenIcon";
import ActionButtonComponent from "./ActionButton";

export default function HomePageChooseActionComponent() {
    return(<div className="row justify-content-center">
        <ActionButtonComponent text="Rejoindre" target="#join_room" icon={<DoorOpenIcon className="text-primary-emphasis"/>} delay="0.5" />
        <ActionButtonComponent text="Créer" target="#create_room" icon={<CapslockIcon className="text-primary-emphasis" />} delay="1" />
    </div>)
}
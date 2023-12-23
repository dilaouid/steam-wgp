import { createRoom } from "../../../api/lobby";
import { APIResponse } from "../../../types/API";
import CapslockIcon from "../Icons/CapslockIcon";
import DoorOpenIcon from "../Icons/DoorOpenIcon";
import ActionButtonComponent from "./ActionButton";
import { AuthContext } from "../../../context/AuthProvider";
import { useContext } from "react";

export default function HomePageChooseActionComponent() {
    const { auth, setAuth } = useContext(AuthContext);

    return(<div className="row justify-content-center">
        <ActionButtonComponent 
            text="Rejoindre"
            target="#join_room"
            icon={<DoorOpenIcon className="text-primary-emphasis"/>}
            delay="0.5"
        />

        <ActionButtonComponent
            text="Créer"
            target="#create_room"
            icon={<CapslockIcon className="text-primary-emphasis" />}
            delay="1"
            onClick={async (): Promise<APIResponse> => {
                return await createRoom(setAuth);
            }}
        
        />
    </div>)
}
import { createRoom } from "../../../api/lobby";
import { APIResponse } from "../../../types/API";
import CapslockIcon from "../Icons/CapslockIcon";
import DoorOpenIcon from "../Icons/DoorOpenIcon";
import ActionButtonComponent from "./ActionButton";

import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { Auth } from "../../../context";

export default function HomePageChooseActionComponent() {
    const { setAuth } = useContext(Auth.Context)!;
    const { t } = useTranslation();

    return(<div className="row justify-content-center">
        <ActionButtonComponent 
            text={t('join')}
            target="#join_room"
            icon={<DoorOpenIcon className="text-primary-emphasis"/>}
            delay="0.5"
        />

        <ActionButtonComponent
            text={t('create')}
            target="#create_room"
            icon={<CapslockIcon className="text-primary-emphasis" />}
            delay="1"
            onClick={async (): Promise<APIResponse> => {
                return await createRoom(setAuth);
            }}
        
        />
    </div>)
}
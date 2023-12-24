import { useState, useContext } from "react";
import styled from "styled-components"

import { Auth } from "../../../context";
import { joinOrLeaveRoom } from "../../../api/lobby";

const Alert = styled.div`
    margin-top: 16px;
`;

const ModalBody = styled.div`
    background: url('assets/img/dots.png');
    background-size: cover;
`;

const Modal = styled.div`
    background: rgba(6,6,6,0.79);
    padding-top: 140px;
`;

export default function ModalJoinComponent() {
    const { setAuth } = useContext(Auth.Context)!;
    const [ uuid, setUuid ] = useState('');
    const [ alert, setAlert ] = useState({ type: '', message: '', display: false });

    const isValidUuid = (uuid: string) => {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
    };

    const handleSubmit = async () => {
        if (!isValidUuid(uuid)) {
            setAlert({ type: 'danger', message: 'UUID non valide', display: true });
            return;
        }
        
        try {
            await joinOrLeaveRoom(uuid, setAuth);
            window.location.href = '/waitlist/' + uuid;
        } catch (error) {
            console.log(error);
            setAlert({ type: 'danger', message: 'Erreur lors de la soumission', display: true });
        }
    };

    return(
    <Modal className="modal fade" role="dialog" id="join_room">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <ModalBody className="modal-body">
                    <label className="form-label">ID de la room</label>
                    <div className="input-group">
                        <input 
                            className="form-control"
                            type="text"
                            value={uuid}
                            onChange={(e) => setUuid(e.target.value)}
                            placeholder="8ad3e88e-cffb-4219-af7b-07c8cb47c12a"
                            required
                        />
                        <button 
                            className={`btn btn-primary ${!isValidUuid(uuid) ? "disabled" : ""}`}
                            type="button"
                            onClick={handleSubmit}
                            disabled={!isValidUuid(uuid)}
                        >Rejoindre</button>
                    </div>
                    { alert.display &&
                        <Alert className={"alert alert-" + alert.type} role="alert">
                            <span>{ alert.message }</span>
                        </Alert>
                    }
                </ModalBody>
            </div>
        </div>
    </Modal>)
}
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

import { Auth } from "../../../context";
import { joinOrLeaveRoom } from "../../../api/lobby";

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
    const [ loading, setLoading ] = useState(false);

    const navigate = useNavigate();

    const isValidUuid = (uuid: string) => {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
    };

    const handleSubmit = async () => {
        setLoading(true)
        if (!isValidUuid(uuid)) {
            toast.error('UUID non valide!', {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                theme: "colored",
                hideProgressBar: false,
            });
            setLoading(false);
            return;
        }
        
        try {
            const joinOrLeave = await joinOrLeaveRoom(uuid, setAuth);
            if (joinOrLeave.data.action === 'leave') {
                toast.success('Vous avez quitté la room!', {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    theme: "colored",
                    hideProgressBar: false,
                });
            } else {
                setTimeout(() => {
                    const modals = document.querySelectorAll('.modal-backdrop');
                    modals.forEach((modal) => {
                        modal.remove();
                    });
                    navigate('/waitlist/' + uuid);
                }, 500);

            }
            setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                theme: "colored",
                hideProgressBar: false,
            });
            setLoading(false);
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
                            className={`btn btn-primary ${!isValidUuid(uuid) || loading ? "disabled" : ""}`}
                            type="button"
                            onClick={handleSubmit}
                            disabled={!isValidUuid(uuid) || loading}
                        >{ loading ? "" : "Rejoindre" }</button>
                    </div>
                </ModalBody>
            </div>
        </div>
    </Modal>)
}
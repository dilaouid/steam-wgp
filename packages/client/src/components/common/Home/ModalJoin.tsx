import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import styled from "styled-components"

import { Auth } from "../../../context";
import { joinRoom } from "../../../api/lobby";

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
    const { t } = useTranslation();
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
            await joinRoom(uuid, setAuth);
            setTimeout(() => {
                const modals = document.querySelectorAll('.modal-backdrop');
                modals.forEach((modal) => {
                    modal.remove();
                });
                navigate('/steam-wgp/waitlist/' + uuid);
            }, 500);
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
                    <label className="form-label">{t('room_id')}</label>
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
                            className={`btn ${!isValidUuid(uuid) || loading ? "btn-secondary disabled" : "btn-primary"}`}
                            type="button"
                            onClick={handleSubmit}
                            disabled={!isValidUuid(uuid) || loading}
                        >{ loading ? <Spinner animation="grow" variant="dark" size="sm" /> : t('join') }</button>
                    </div>
                </ModalBody>
            </div>
        </div>
    </Modal>)
}
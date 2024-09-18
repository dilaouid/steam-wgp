import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Row, Col, Button, Modal } from "react-bootstrap";

import { useSteamderStore } from "../../../../store/steamderStore";
import { useAuthStore } from "../../../../store/authStore";
import { useLeaveSteamder } from "../../../../hooks/useLeaveSteamder";

import { IPlayer } from "../../../../types/ISteamder";
import { leaveSteamder, startSteamder } from "../../../../services/websocket/send";

const StyledRow = styled(Row)`
    height: 91px;
`;

export const RoomActions: React.FC = () => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "steamder.actions" });
    const { steamder, setSteamder } = useSteamderStore();
    const { user, setUser } = useAuthStore();
    const navigate = useNavigate();
    const leaveMutation = useLeaveSteamder();

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    if (!steamder) return null;

    const admin: IPlayer = steamder.players?.find(p => p.player_id == steamder.admin_id) as IPlayer;
    const isAdmin = admin?.player_id == user?.id;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    const leaveRoom = () => {
        setLoading(true);
        leaveMutation.mutateAsync(steamder.id).then(() => {
            if (!user) return;
            leaveSteamder();
            setUser({ ...user, steamder: null });
            setSteamder(null);
        }).finally(() => {
            setLoading(false)
            navigate({ to: "/steamders" });
        });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{ t('modal.leave.title') }</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        { t('modal.leave.content') }
                        { isAdmin && <p className="text-warning fw-bold"> { t('modal.leave.warning') } </p> }
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        { t('modal.leave.no') }
                    </Button>
                    <Button variant="warning" onClick={leaveRoom}>
                        { t('modal.leave.yes') }
                    </Button>
                </Modal.Footer>
            </Modal>
            <StyledRow className="justify-content-center">
                { isAdmin && <Col sm={"auto"} className="align-self-center">
                    <Button variant="outline-info" className="shadow" disabled={
                        loading || steamder.players?.length < 2 || (steamder.display_all_games && steamder.all_games.length == 0) || (!steamder.display_all_games && steamder.common_games.length == 0)
                    } onClick={() => { 
                        setLoading(true);
                        startSteamder();
                    }} >{t('start')}</Button>
                </Col> }
                <Col sm={"auto"} className="align-self-center">
                    <Button variant="outline-danger" className="shadow" onClick={handleShow} disabled={loading}>{t('leave')}</Button>
                </Col>
            </StyledRow>
        </>
    );
};
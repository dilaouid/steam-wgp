import styled from "styled-components";
import { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import { BsPersonFillX } from "react-icons/bs";
import { Trans, useTranslation } from "react-i18next";

import { useKickSteamder } from "../../../../hooks/useKickSteamder";
import { kickFromSteamderWS } from "../../../../services/websocket/send";

const StyledButton = styled.button`
    margin: 144px 108px 108px;
    margin-left: 92px;
    z-index: 1;
    border-radius: 19px;
    position: absolute;
`;

const StyledIcon = styled(BsPersonFillX)`
    font-size: 29px;
`;

interface KickPlayerButtonProps {
    playerId: string;
    steamderId: string;
    username: string;
}

export const KickPlayerButton: React.FC<KickPlayerButtonProps> = ({ playerId, steamderId, username }) => {
    const { t } = useTranslation("pages/steamder", { keyPrefix: "steamder.actions.modal.kick" });
    const [show, setShow] = useState(false);
    const kickMutation = useKickSteamder(steamderId, playerId);
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    const kickPlayer = () => {
        kickMutation.mutateAsync().then(() => {
            kickFromSteamderWS(playerId);
            handleClose();
        });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{ t('title') }</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Trans t={t} i18nKey="content" values={{ username }} components={{ 1: <strong className="text-info" /> }} />
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        { t('no') }
                    </Button>
                    <Button variant="warning" onClick={kickPlayer}>
                        { t('yes') }
                    </Button>
                </Modal.Footer>
            </Modal>
            <StyledButton className="btn btn-danger btn-sm shadow" onClick={handleShow}>
                <StyledIcon />
            </StyledButton>
        </>
    );
};
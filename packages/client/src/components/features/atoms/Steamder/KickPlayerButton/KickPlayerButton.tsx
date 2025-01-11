import { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";

import { useKickSteamder } from "core/hooks/useKickSteamder";
import { kickFromSteamderWS } from "@core/services/WebSockets/send";
import { StyledButton, StyledIcon, KickPlayerButtonProps } from ".";

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
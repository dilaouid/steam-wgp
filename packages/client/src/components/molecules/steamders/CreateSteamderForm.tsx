import styled from "styled-components";
import { Form, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { BsController, BsPersonHeart } from "react-icons/bs";

const StyledForm = styled(Form)`
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 21px;
    margin-bottom: 47px;
`;

const StyledLabel = styled(Form.Label)`
    user-select: none;
`;

const StyledInput = styled(Form.Control)`
    width: 79%;
    font-family: Abel, sans-serif;
    margin-bottom: 11px;
`;

const StyledSwitch = styled(Form.Check)`
    font-family: Abel, sans-serif;
    margin-bottom: 11px;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LabelTooltip = (props: any) => 
    <Tooltip id="switch-tooltip" {...props}>
        Une Steamder privée ne sera joignable qu'en partageant un lien
    </Tooltip>;

export const CreateSteamderForm = () => {

    return (
        <StyledForm className="text-muted">
            <StyledLabel><BsController /> | Nom de la Steamder</StyledLabel>
            <StyledInput type="text" placeholder="Shrek is forbidden" aria-label="Nom de la Steamder" />
            <OverlayTrigger placement="left" overlay={LabelTooltip} trigger={['hover', 'focus']}>
                <StyledSwitch type="switch" id="private-switch" label="Steamder privée" />
            </OverlayTrigger>
            <Button variant="info">
                <BsPersonHeart /> | Créer la Steamder
            </Button>
        </StyledForm>
    )
};
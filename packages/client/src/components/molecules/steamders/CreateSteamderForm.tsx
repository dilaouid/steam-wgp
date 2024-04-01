import styled from "styled-components";
import { Form, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { BsController, BsPersonHeart } from "react-icons/bs";
import { useTranslation } from "react-i18next";

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
const LabelTooltip = (message: string) => 
    <Tooltip id="switch-tooltip">
        { message }
    </Tooltip>;

export const CreateSteamderForm = () => {
    const { t } = useTranslation('pages/steamders', { keyPrefix: 'left_column.form' });

    return (
        <StyledForm className="text-muted">
            <StyledLabel><BsController /> | { t('name') }</StyledLabel>
            <StyledInput type="text" placeholder={ t('placeholder') } aria-label={ t('placeholder') } />
            <OverlayTrigger placement="left" overlay={LabelTooltip(t('tooltip'))} trigger={['hover', 'focus']}>
                <StyledSwitch type="switch" id="private-switch" label={ t('label') } />
            </OverlayTrigger>
            <Button variant="info">
                <BsPersonHeart /> | { t('submit') }
            </Button>
        </StyledForm>
    )
};
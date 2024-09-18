import { useState } from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Form, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { BsController, BsPersonHeart } from "react-icons/bs";

import { useCreateSteamder } from "../../../hooks/useCreateSteamder";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../../store/authStore";

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
    const [ name, setName ] = useState('');
    const { t } = useTranslation('pages/steamders', { keyPrefix: 'left_column.form' });
    const { setUser, user } = useAuthStore();
    const [ isPrivate, setIsPrivate ] = useState(false);
    const navigate = useNavigate();

    const createSteamderMutation = useCreateSteamder();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;
        createSteamderMutation.mutateAsync({ name, isPrivate }).then((data) => {
            setUser({ ...user, steamder: data.data.id });
            navigate({
                to: `/steamder/${data.data.id}`
            })
        }).catch((err) => {
            console.error(err);
        });
    };

    return (
        <StyledForm className="text-muted" onSubmit={handleSubmit}>
            <StyledLabel><BsController /> | { t('name') }</StyledLabel>
            <StyledInput type="text" placeholder={ t('placeholder') } aria-label={ t('placeholder') } value={name} onChange={e => setName(e.target.value)} disabled={createSteamderMutation.isPending} />
            <OverlayTrigger placement="left" overlay={LabelTooltip(t('tooltip'))} trigger={['hover', 'focus']}>
                <StyledSwitch type="switch" id="private-switch" label={ t('label') } checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} disabled={createSteamderMutation.isPending} />
            </OverlayTrigger>
            <Button variant="info" type="submit" disabled={createSteamderMutation.isPending || (name.length > 0 && name.length < 3) }>
                <BsPersonHeart /> | { createSteamderMutation.isPending ? t('loading') : t('submit') }
            </Button>
        </StyledForm>
    )
};
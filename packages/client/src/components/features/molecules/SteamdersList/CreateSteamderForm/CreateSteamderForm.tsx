import { useState } from "react";

import { useTranslation } from "react-i18next";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { FormLabel } from "@features/atoms/SteamdersList/FormLabel";

import { useCreateSteamder } from "@core/hooks/useCreateSteamder";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@steamwgp/shared-ui"
import { SubmitButton } from "@features/atoms/SteamdersList/SubmitButton";

import { StyledForm, StyledInput, StyledSwitch } from "./CreateSteamderForm.styled";

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
        if (createSteamderMutation.isPending || (name.length > 0 && name.length < 3)) return;
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
            <FormLabel />
            <StyledInput type="text" placeholder={ t('placeholder') } aria-label={ t('placeholder') } value={name} onChange={e => setName(e.target.value)} disabled={createSteamderMutation.isPending} />
            <OverlayTrigger flip={true} placement="left" overlay={LabelTooltip(t('tooltip'))} trigger={['hover', 'focus']}>
                <StyledSwitch type="switch" id="private-switch" label={ t('label') } checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} disabled={createSteamderMutation.isPending} />
            </OverlayTrigger>
            <SubmitButton name={name} />
        </StyledForm>
    )
};
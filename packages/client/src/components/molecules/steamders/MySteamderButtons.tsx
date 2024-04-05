import styled from "styled-components";

import { useState } from "react";

import { Link } from "@tanstack/react-router"
import { Button, Col, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next";

import { BsBoxArrowInDown, BsDoorOpen } from "react-icons/bs"
import { useAuthStore } from "../../../store/authStore";
import { useSteamderStore } from "../../../store/steamderStore";
import { useLeaveSteamder } from "../../../hooks/useLeaveSteamder";

const StyledSpinner = styled(Spinner)`
    margin-left: 0.2rem;
`;

export const MySteamderButtons = ({ id }: { id: string }) => {
    const { t } = useTranslation('pages/steamders', { keyPrefix: 'right_column.table.buttons' });
    const { user, setUser } = useAuthStore();
    const { setSteamder } = useSteamderStore();
    const leaveMutation = useLeaveSteamder();

    const [loading, setLoading] = useState(false);

    const handleLeave = () => {
        setLoading(true);
        leaveMutation.mutateAsync(id).then(() => {
            if (!user) return;
            setUser({ ...user, waitlist: null });
            setSteamder(null);
        }).finally(() => setLoading(false));
    };

    return (
        <>
            <Col className="text-center" sm={'auto'}>
                <Link disabled={loading} to={`/steamder/${id}`}>
                    <Button disabled={loading} size="sm" variant="primary"><BsBoxArrowInDown /> | { t('open') }</Button>
                </Link>
            </Col>
            <Col className="text-center" sm={'auto'}>
                <Button disabled={loading} size="sm" variant="danger" onClick={handleLeave}><BsDoorOpen /> | { loading ? <StyledSpinner size="sm" /> : t('leave') }</Button>
            </Col>
        </>
    )
}
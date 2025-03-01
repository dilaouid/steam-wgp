import { useEffect } from "react";

import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import useSSEQuery from "@core/services/SSE/login";
import { ProgressLabel } from "@ui/atoms";
import { RightBlock, Progress, Title } from "./Progress.styled";

export const ProgressLogin: React.FC = () => {
    const { t } = useTranslation('pages/login');
    const { data } = useSSEQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (data[data.length - 1]?.complete) {
            // set loadingLoginComplete to true in localStorage if the user already logged in once
            localStorage.setItem('loadingLoginComplete', 'true');
            if (data[data.length - 1]?.type === 'success') {
                // wait 3000ms before navigating to the home page
                setTimeout(() => {
                    const redirectUrl = localStorage.getItem('postLoginRedirect') || '/';
                    navigate({ to: redirectUrl });
                    localStorage.removeItem('postLoginRedirect');
                }, 3000);
            }
        }
    }, [data, navigate]);

    return (
        <Col sm={12} lg={8} className="text-center" data-aos="zoom-out" data-aos-duration="600">
            <RightBlock>
                <Title className="text-warning text-opacity-75">{ t('syncing') }</Title>
                <Progress variant={data[data.length - 1]?.type ?? 'info'} striped animated now={ data[data.length - 1]?.progress ?? 0 } />
                <ul className="list-unstyled">
                {data && data.map((msg, index) => (
                    <ProgressLabel key={index} message={msg.message} type={msg.type} last={index === data.length - 1} complete={msg.complete} count={msg?.count} />
                ))}
                </ul>
            </RightBlock>
        </Col>
    )
};
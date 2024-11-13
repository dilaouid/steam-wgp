import styled from "styled-components";
import { Col, ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import useSSEQuery from "@services/sse/loginSSE";
import { ProgressLabelComponent } from "@atoms/login/ProgressLabel";
import { useEffect } from "react";

const RightBlock = styled.div`
    background: #060606d2;
    padding: 36px;
    border-radius: 26px;
`;

const Title = styled.h4`
    font-family: Agdasima, sans-serif;
`;

const Progress = styled(ProgressBar)`
    margin-top: 23px;
    margin-bottom: 7px;
`;

export const RightColumnLogin: React.FC = () => {
    const { t } = useTranslation('pages/login');
    const { data } = useSSEQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (data[data.length - 1]?.complete) {
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
                    <ProgressLabelComponent key={index} message={msg.message} type={msg.type} last={index === data.length - 1} complete={msg.complete} count={msg?.count} />
                ))}
                </ul>
            </RightBlock>
        </Col>
    )
};
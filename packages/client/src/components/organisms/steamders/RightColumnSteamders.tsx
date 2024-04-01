import styled from "styled-components";
import { Col, Row, Table, Spinner } from "react-bootstrap";
import { BsPeople, BsController } from "react-icons/bs";
import { useTranslation, Trans } from "react-i18next";

import { useAuthStore } from "../../../store/authStore";
import { useGetSteamders } from "../../../hooks/useGetSteamders";
import { useCountSteamders } from "../../../hooks/useCountSteamders";

import { ISteamderSearch } from "../../../types/ISteamderSearch";

import { LoadingTable } from "../../molecules/steamders/LoadingTable";
import { UnjoinableButton } from "../../molecules/steamders/UnjoinableButton";
import { JoinButton } from "../../molecules/steamders/JoinButton";
import { MySteamderButtons } from "../../molecules/steamders/MySteamderButtons";

const StyledTitle = styled.h4`
    font-family: 'Archivo Narrow', sans-serif;
`;

const StyledTRow = styled.tr`
    font-family: Abel, sans-serif;
`;

export const RightColumnSteamders = () => {
    const { t } = useTranslation('pages/steamders', { keyPrefix: 'right_column' });
    const page = new URLSearchParams(window.location.search).get('page');

    const { user } = useAuthStore();
    const { data: steamders, isFetching: fetchingSteamders } = useGetSteamders(page ? parseInt(page) : 1);
    const { data: count, isFetching: fetchingCount } = useCountSteamders();

    return (
        <Col sm={12} md={7} lg={8}>
            <StyledTitle className="text-warning">{ t('heading') }</StyledTitle>
            <p>
                <Trans t={t} i18nKey="subtitle" components={{ 1: <strong className="text-info" />, 2: <strong /> }} />
            </p>
            <Table striped bordered hover>
                <caption>
                    <Spinner animation="border" variant="secondary" className="me-2" size="sm" hidden={!fetchingCount} />
                    { !fetchingCount && t('actives', { count: count }) }
                </caption>
                <thead className="user-select-none">
                    <StyledTRow className="table-warning">
                        <th style={{width: '30%'}}>{ t('table.heading.name') }</th>
                        <th style={{width: '23%'}}>{ t('table.heading.players_count') }</th>
                        <th style={{width: '20%'}}>{ t('table.heading.available_games') }</th>
                        <th style={{width: '25%'}}>{ t('table.heading.actions') }</th>
                    </StyledTRow>
                </thead>
                <tbody>
                    
                    { fetchingSteamders && <LoadingTable /> }

                    { !fetchingSteamders && steamders && steamders.length === 0 && (
                        <StyledTRow>
                            <td colSpan={4} className="text-center">{ t('table.empty') }</td>
                        </StyledTRow>
                    )}

                    { steamders && steamders.map((steamder: ISteamderSearch) => (
                        <StyledTRow key={steamder.id}>
                            <td>{steamder.name}</td>
                            <td><BsPeople /> {steamder.player_count}</td>
                            <td className={steamder.games == 0 ? 'text-danger' : ''}><BsController /> {steamder.games}</td>
                            <td>
                                <Row className="gx-2 justify-content-center">

                                    { user?.waitlist && user.waitlist !== steamder.id &&
                                        <UnjoinableButton />
                                    }

                                    { user && (!user?.waitlist || user.waitlist === steamder.id) &&
                                        <MySteamderButtons id={steamder.id} />
                                    }

                                    { !user?.waitlist && 
                                        <JoinButton id={steamder.id} />
                                    }
                                    
                                </Row>
                            </td>
                        </StyledTRow>
                    ))}
                </tbody>
            </Table>
        </Col>
    )
};
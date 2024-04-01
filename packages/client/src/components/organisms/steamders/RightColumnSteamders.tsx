import styled from "styled-components";
import { Col, Row, Table, Spinner } from "react-bootstrap";
import { LoadingTable } from "../../molecules/steamders/LoadingTable";
import { useGetSteamders } from "../../../hooks/useGetSteamders";
import { BsPeople, BsController } from "react-icons/bs";
import { ISteamderSearch } from "../../../types/ISteamderSearch";
import { useAuthStore } from "../../../store/authStore";
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
    const { user } = useAuthStore();
    const page = new URLSearchParams(window.location.search).get('page');
    const { data, isFetching } = useGetSteamders(page ? parseInt(page) : 1);


    return (
        <Col sm={12} md={7} lg={8}>
            <StyledTitle className="text-warning">Steamders publiques</StyledTitle>
            <p>Retrouvez ici les <strong className="text-info">Steamders</strong> accessibles à tout le monde. Le moyen idéal de se faire de nouveaux amis ! Mais n'oubliez pas, <strong>vous ne pouvez être que dans une seule <span className="text-info">Steamder</span></strong> à la fois ! N'abusons pas des bonnes choses ...</p>
            <Table striped bordered hover>
                <caption>
                    <Spinner animation="border" variant="secondary" className="me-2" size="sm" />
                     Steamders actives
                </caption>
                <thead className="user-select-none">
                    <StyledTRow className="table-warning">
                        <th style={{width: '30%'}}>Nom de la Steamder</th>
                        <th style={{width: '23%'}}>Nombre de joueurs</th>
                        <th style={{width: '20%'}}>Jeux disponibles</th>
                        <th style={{width: '25%'}}>Actions</th>
                    </StyledTRow>
                </thead>
                <tbody>
                    
                    { isFetching && <LoadingTable /> }

                    { !isFetching && data && data.length === 0 && (
                        <StyledTRow>
                            <td colSpan={4} className="text-center">Aucune Steamder n'a été trouvée</td>
                        </StyledTRow>
                    )}

                    { data && data.map((steamder: ISteamderSearch) => (
                        <StyledTRow key={steamder.id}>
                            <td>{steamder.name}</td>
                            <td><BsPeople /> {steamder.player_count}</td>
                            <td className={steamder.games == 0 ? 'text-danger' : ''}><BsController /> {steamder.games}</td>
                            <td>
                                <Row className="gx-2 justify-content-center">

                                    { user?.waitlist && user.waitlist !== steamder.id &&
                                        <UnjoinableButton />
                                    }

                                    { (!user?.waitlist || user.waitlist === steamder.id) &&
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
import { useTranslation } from "react-i18next";
import CountUp from 'react-countup';

import { Col, Row, Spinner } from "react-bootstrap";

import LogoImage from '@assets/images/homepage/logo.png';
import { DiagramIcon, PersonHeartsIcon, PersonWorkspaceIcon, StatsControllerIcon } from "@ui/atoms";

import { useStats } from "@core/hooks/useStatsApi";
import { StyledLogoSeparator, StyledContainer } from ".";

export const StatsHome: React.FC = () => {
    const { t } = useTranslation('pages/homepage');
    const { data, isPending } = useStats();

    return(
    <div data-aos="flip-down">
        <hr />
        <StyledLogoSeparator alt="SteamWGP logo for separator sections" className="img-fluid user-select-none" data-aos="flip-down" src={LogoImage} loading="lazy" />
        <StyledContainer className="py-4 py-xl-5">
            <Row className="gy-4 row-cols-2 row-cols-md-4">

                <Col data-aos="fade-up">
                    <div className="text-center d-flex flex-column justify-content-center align-items-center py-3">
                        <PersonWorkspaceIcon />
                        <div className="px-3">
                            <h2 className="fw-bold mb-0">
                                { isPending && <Spinner animation="border" /> }
                                { !isPending &&
                                    <CountUp separator=" " start={ 0 } end={ data.players } duration={ 5 } enableScrollSpy={true} scrollSpyOnce={true} scrollSpyDelay={250}>
                                        {({ countUpRef }) => <span ref={countUpRef} />}
                                    </CountUp>
                                }
                            </h2>
                            <p className="mb-0">{ t('stats.registered') }</p>
                        </div>
                    </div>
                </Col>

                <Col data-aos="fade-up" data-aos-delay="100">
                    <div className="text-center d-flex flex-column justify-content-center align-items-center py-3">
                        <StatsControllerIcon />
                        <div className="px-3">
                            <h2 className="fw-bold mb-0">
                                { isPending && <Spinner animation="border" /> }
                                { !isPending &&
                                    <CountUp separator=" " start={ 0 } end={ data.games } duration={ 3 } enableScrollSpy={true} scrollSpyOnce={true} scrollSpyDelay={250}>
                                        {({ countUpRef }) => <span ref={countUpRef} />}
                                    </CountUp>
                                }
                            </h2>
                            <p className="mb-0">{ t('stats.repertoried') }</p>
                        </div>
                    </div>
                </Col>



                <Col data-aos="fade-up" data-aos-delay="200">
                    <div className="text-center d-flex flex-column justify-content-center align-items-center py-3">
                        <PersonHeartsIcon />
                        <div className="px-3">
                            <h2 className="fw-bold mb-0">
                                { isPending && <Spinner animation="border" /> }
                                { !isPending &&
                                    <CountUp separator=" " start={ 0 } end={ data.matches } duration={ 5 } enableScrollSpy={true} scrollSpyOnce={true} scrollSpyDelay={250}>
                                        {({ countUpRef }) => <span ref={countUpRef} />}
                                    </CountUp>
                                }
                            </h2>
                            <p className="mb-0">{ t('stats.matches') }</p>
                        </div>
                    </div>
                </Col>

                <Col data-aos="fade-up" data-aos-delay="300">
                    <div className="text-center d-flex flex-column justify-content-center align-items-center py-3">
                        <DiagramIcon />
                        <div className="px-3">
                            <h2 className="fw-bold mb-0">
                                { isPending && <Spinner animation="border" /> }
                                { !isPending &&
                                    <CountUp separator=" " start={ 0 } end={ data.steamders } duration={ 5 } enableScrollSpy={true} scrollSpyOnce={true} scrollSpyDelay={250}>
                                        {({ countUpRef }) => <span ref={countUpRef} />}
                                    </CountUp>
                                }
                            </h2>
                            <p className="mb-0">{ t('stats.actives') }</p>
                        </div>
                    </div>
                </Col>

            </Row> 
        </StyledContainer>
        <hr />
    </div>)
};
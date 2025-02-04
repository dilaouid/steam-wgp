import { Col, Container, Row } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { GameCard } from "@features/molecules/Homepage/GameCard/GameCard";
import { StyledTitle } from "@features/atoms/Homepage/StyledTitle/StyledTitle";

import { StyledPodium } from "./Podium.styled";

export const Podium: React.FC = () => {
    const { t } = useTranslation('pages/homepage', { keyPrefix: 'podium' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: statsData, isPending } = useQuery<any>({
        queryKey: ['stats'],
        select: (data) => data.data
    });

    const calculateScorePercentage = (score: number, totalMatches: number) => totalMatches > 0 ? (score / totalMatches) * 100 : 0;

    const passScore = (index: number) => {
        return { 
            game_id: statsData?.podium[index].game_id,
            score: calculateScorePercentage(statsData?.podium[index].score, statsData?.matches)
        }
    }

    return (
        <>
            { statsData?.podium.length > 0 && <Container>
                <Row className="mb-5" data-aos="zoom-out">
                    <Col md={8} xl={6} className="text-center mx-auto">
                        <StyledTitle>{ t('title') }</StyledTitle>
                        <p className="w-lg-50">
                            <Trans t={t} i18nKey="content" components={{ 1: <strong  className="text-info"/> }} />
                        </p>
                    </Col>
                </Row>
                <StyledPodium data-aos="zoom-out" data-aos-duration="800">
                    {/* Second place */}
                    { statsData?.podium.length > 1 && <GameCard size="small" color="silver" score={isPending ? null : passScore(1) } /> }
                    
                    {/* First place */}
                    { statsData?.podium.length > 0 && <GameCard size="large" color="gold" score={isPending ? null : passScore(0) } /> }
                    
                    {/* Third place */}
                    { statsData?.podium.length > 2 && <GameCard size="small" color="#cd7f32" score={isPending ? null : passScore(2) } /> }
                </StyledPodium>
             </Container> }
             { statsData?.podium.length > 0 && <hr /> }
        </>
    )
};
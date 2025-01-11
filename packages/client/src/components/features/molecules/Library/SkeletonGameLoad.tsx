import styled from "styled-components";

import { Col, Container } from "react-bootstrap";
import { SkeletonGameCard } from "components/features/atoms/Library/SkeletonGameCard/SkeletonGameCard";

const StyledCol = styled(Col)`
    margin-bottom: 20px;
`;

export const SkeletonGameLoad: React.FC = () => {
    return (
        <StyledCol sm={6} md={6} lg={3} className="text-center align-self-center">
            <Container>
                <SkeletonGameCard />
            </Container>
        </StyledCol>
    );
};
import { Container } from "react-bootstrap";
import { SkeletonGameCard } from "@features/atoms/Library/SkeletonGameCard";

import { StyledCol } from ".";

export const SkeletonGameLoad: React.FC = () => {
    return (
        <StyledCol sm={6} md={6} lg={3} className="text-center align-self-center">
            <Container>
                <SkeletonGameCard />
            </Container>
        </StyledCol>
    );
};
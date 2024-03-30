import styled from "styled-components"
import Lottie from "lottie-react";
import LoadingController from '../../assets/lottie/loader.json';

const StyledLoader = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyledLoaderText = styled.p`
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
`;

export const Loader: React.FC = () => {
    return(
        <>
            <StyledLoaderText className="text-warning">Loading ...</StyledLoaderText>
            <StyledLoader>
                <Lottie animationData={LoadingController} />
            </StyledLoader>
        </>
    )
}
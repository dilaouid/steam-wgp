import styled from "styled-components";

import { BsHeartFill } from "react-icons/bs";

export const StyledHeart = styled(BsHeartFill)`
    z-index: 4;
    position: absolute;
    font-size: 124px;
    margin: 109px;
    margin-top: 169px;
    margin-left: 108px;
    transform: scale(1);

    // play an animation, appears in fade in
    @keyframes fadeIn {
        0% { opacity: 0; transform: scale(0.5);}
        100% { opacity: 1; transform: scale(1);}
    }

    animation: fadeIn 0.5s ease-in-out;
`;
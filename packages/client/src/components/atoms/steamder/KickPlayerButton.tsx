import styled from "styled-components";
import { BsPersonFillX } from "react-icons/bs";

const StyledButton = styled.button`
    margin: 144px 108px 108px;
    margin-left: 92px;
    z-index: 1;
    border-radius: 19px;
    position: absolute;
`;

const StyledIcon = styled(BsPersonFillX)`
    font-size: 29px;
`;

export const KickPlayerButton: React.FC<{ playerId: string; steamderId: string }> = ({ playerId, steamderId }) => {
    return (
        <StyledButton className="btn btn-danger btn-sm shadow">
            <StyledIcon />
        </StyledButton>
    );
};
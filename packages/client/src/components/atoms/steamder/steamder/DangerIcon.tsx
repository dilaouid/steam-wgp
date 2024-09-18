import styled from "styled-components";
import { BsExclamationOctagonFill } from "react-icons/bs";

const StyledIcon = styled(BsExclamationOctagonFill)`
    font-size: 26px;
    margin-left: 50px;
    position: absolute;
    margin-top: 13px;
`;

export const DangerIcon: React.FC = () => {
    return (
        <StyledIcon className="text-danger" />
    );
};
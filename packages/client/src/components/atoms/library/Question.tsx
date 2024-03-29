import styled from "styled-components";
import { ReactNode } from "react";
import { BsFillQuestionOctagonFill } from "react-icons/bs";

const StyledQuestionIcon = styled(BsFillQuestionOctagonFill)`
    margin-right: 10px;
`;

type QuestionProps = {
    children: ReactNode;
};

export const Question: React.FC<QuestionProps> = ({ children }) => {
    return(
        <strong className="text-primary user-select-none"><StyledQuestionIcon />{ children }</strong>
    )
};
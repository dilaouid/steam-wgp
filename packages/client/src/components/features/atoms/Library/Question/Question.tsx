import { QuestionProps, StyledIcon } from "./";

export const Question: React.FC<QuestionProps> = ({ children }) => {
    return(
        <>
            <strong className="text-primary user-select-none">
                <StyledIcon />{ children }
            </strong><br />
        </>
    )
};
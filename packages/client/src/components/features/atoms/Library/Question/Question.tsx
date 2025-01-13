import { QuestionProps, StyledQuestionIcon } from "./";

export const Question: React.FC<QuestionProps> = ({ children }) => {
    return(
        <>
            <strong className="text-primary user-select-none">
                <StyledQuestionIcon />{ children }
            </strong><br />
        </>
    )
};
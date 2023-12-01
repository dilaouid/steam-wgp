import styled from "styled-components";
import { DangerIconComponent } from "./DangerIcon";

const ProgressLabel = styled.p`
    font-family: Abel, sans-serif;
    margin-bottom: 0px;
`;

interface ProgressLabelComponentProps {
    type: string;
    message: string;
}

export const ProgressLabelComponent: React.FC<ProgressLabelComponentProps> = ({ type, message }) => {
    return (
        <ProgressLabel className={"text-center text-"+type+"-emphasis"} data-aos="fade-up" data-aos-duration="700" data-aos-once="true">
            { type === "danger" ? <DangerIconComponent /> : null}
            { message }
        </ProgressLabel>
    )
};
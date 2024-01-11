import styled from "styled-components";
import { Trans } from "react-i18next";

const Username = styled.strong`
    color: rgb(105, 34, 140);
`;

interface HelloComponentProps {
    username: string;
}

export const HelloComponent: React.FC<HelloComponentProps> = ({ username }) => {
    return (
        <h3 className="text-primary-emphasis">
            <Trans
                i18nKey='hello_username'
                values={{ username }}
                components={[<Username key="0" />]}
            />
        </h3>
    )
};
import styled from "styled-components";

const Username = styled.strong`
    color: rgb(105, 34, 140);
`;

interface HelloComponentProps {
    username: string;
}

export const HelloComponent: React.FC<HelloComponentProps> = ({ username }) => {
    return (
        <h3 className="text-primary-emphasis">Bonjour <Username>{ username }</Username> !</h3>
    )
};
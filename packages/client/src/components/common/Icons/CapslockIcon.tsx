import styled from "styled-components";

const Icon = styled.svg`
    font-size: 47px;
    margin-bottom: 10px;
`;

export default function CapslockIcon({ className }: { className?: string }) {
    return (<Icon xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className={ className + " bi bi-capslock-fill fs-2"}>
        <path d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM4.5 13.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1z">
        </path>
    </Icon>);
}
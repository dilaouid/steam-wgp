import styled from "styled-components";

const Icon = styled.svg`
    font-size: 47px;
    margin-bottom: 10px;
`;

export default function DoorOpenIcon({ className }: { className?: string }) {
    return (<Icon xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className={ className + " bi bi-door-open-fill fs-2"}>
        <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z">
        </path>
    </Icon>);
}
import { ReactNode } from "react";
import './ActionButton.css';
import styled from "styled-components";

interface ActionButtonComponentProps {
    text: string;
    target: string;
    delay: string;
    icon: ReactNode;
}

const TextButton = styled.span`
    font-size: 1.2rem;
    font-weight: bolder;
`;

export default function ActionButtonComponent({ text, target, icon, delay }: ActionButtonComponentProps) {
    return(<div className={"col-auto align-self-center animate__animated animate__fadeInUp animate__delay-" + delay}>
        <button className="btn btn-outline-primary bg-black bg-opacity-75 bg-gradient joinOrCreateBtn" type="button" data-bs-target={ target } data-bs-toggle="modal">
            { icon }
            <br />
            <TextButton>{ text }</TextButton>
        </button>
    </div>)
}
import { ReactNode, useState } from "react";
import './ActionButton.css';
import styled from "styled-components";
import { SpinnerIconComponent } from "../Icons/SpinnerIcon";
import { toast } from "react-toastify";
import { APIResponse } from "../../../types/API";

interface ActionButtonComponentProps {
    text: string;
    target: string;
    delay: string;
    icon: ReactNode;
    onClick?: () => Promise<APIResponse>;
}

const TextButton = styled.span`
    font-size: 1.2rem;
    font-weight: bolder;
`;

const AnimateDiv = styled.div<{ delay: string }>`
  --animate-duration: ${(props) => props.delay}s;
`;

export default function ActionButtonComponent({ text, target, icon, delay, onClick }: ActionButtonComponentProps) {
    const [isLoading, setIsLoading] = useState(false);


    const handleClick = async () => {
        setIsLoading(true);
        if (onClick) {
            try {
                const waitlist = await onClick();
                window.location.href = `/waitlist/${waitlist.data.id}`;
                setIsLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error(error);
                toast.error(error.message, {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    theme: "colored",
                    hideProgressBar: true,
                });
                setIsLoading(false);
            }
        }
    };

    return(<AnimateDiv className="col-auto align-self-center animate__animated animate__fadeInUp" delay={delay}>
        <button 
            className={`btn bg-black bg-opacity-75 joinOrCreateBtn ${isLoading ? 'disabled btn-outline-secondary' : 'bg-gradient btn-outline-primary'}`}
            type="button"
            data-bs-target={onClick ? undefined : target} 
            data-bs-toggle={onClick ? undefined : "modal"}
            onClick={onClick ? handleClick : undefined}
            disabled={isLoading}

        >
            {isLoading ? <SpinnerIconComponent /> : icon}
            <br />
            <TextButton>{ isLoading ? '' : text }</TextButton>
        </button>
    </AnimateDiv>)
}
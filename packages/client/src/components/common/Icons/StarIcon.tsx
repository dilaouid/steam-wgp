import styled from "styled-components";


export function StarIcon({ isLoggedUser }: { isLoggedUser: boolean }) {

    const Icon = styled.svg`
        position: absolute;
        color: var(--bs-warning);
        font-size: 44px;
        margin: -14px;
        ${isLoggedUser ? 'margin-top: 0px;' : 'margin-top: 55px;'}
    `;

    return (
    <Icon xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-star-fill border rounded-pill border-5 shadow">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
    </Icon>);
}
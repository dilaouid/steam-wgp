import styled from 'styled-components';

const Disclaimer = styled.p`
    font-size: 9px;
`;

export default function DisclaimerComponent() {
    return (
        <Disclaimer>This site is not associated with Valve Corp.</Disclaimer>
    );
}
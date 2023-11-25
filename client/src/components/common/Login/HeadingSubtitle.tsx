import styled from 'styled-components';

const HeadingSubtitle = styled.h4`
    margin-bottom: 37px;
`;

export default function HeadingSubtitleComponent() {
    return (
        <HeadingSubtitle className="font-monospace text-center text-secondary text-opacity-50">
            What are we Going to Play?
        </HeadingSubtitle>
    );
}
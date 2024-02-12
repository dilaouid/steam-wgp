import styled from 'styled-components';

import HeadingMottoComponent from './HeadingMotto';
import HeadingTitleComponent from './HeadingTitle';
import HeadingSubtitleComponent from './HeadingSubtitle';
import SteamBtnComponent from './SteamBtn';
import DisclaimerComponent from './Disclaimer';

const HeadingContainer = styled.div`
    cursor: default;
    user-select: none;
`;

export default function HeadingContainerComponent() {
    return (
        <div className="text-center p-4 p-lg-5">
            <HeadingContainer data-aos='fade-down' data-aos-duration='1000'>
                <HeadingMottoComponent />
                <HeadingTitleComponent />
                <HeadingSubtitleComponent />
            </HeadingContainer>
            <SteamBtnComponent />
            <DisclaimerComponent />
        </div>
    );
}
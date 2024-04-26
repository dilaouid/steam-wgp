import styled from "styled-components";
import Skeleton from 'react-loading-skeleton';

const GoodSizedSkeleton = styled(Skeleton)`
    z-index: 1;
    line-height: 1.5;
`;

export const SkeletonGameCard: React.FC = () => {
    return <GoodSizedSkeleton enableAnimation height={215} highlightColor="#444" baseColor="#333" borderRadius={20+'px'} inline={false} />;
}
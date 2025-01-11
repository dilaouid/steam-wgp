import { GoodSizedSkeleton } from "./SkeletonGameCard.styled";

export const SkeletonGameCard: React.FC = () => {
    return <GoodSizedSkeleton enableAnimation height={215} highlightColor="#444" baseColor="#333" borderRadius={20+'px'} inline={false} />;
}
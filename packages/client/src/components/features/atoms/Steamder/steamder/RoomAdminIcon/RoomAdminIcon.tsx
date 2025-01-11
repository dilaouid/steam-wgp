import { StyledGiCrownedHeart } from "./RoomAdminIcon.styled";

export const RoomAdminIcon: React.FC<{isOtherPlayer: boolean}> = ({ isOtherPlayer }) => {
    return(
        <StyledGiCrownedHeart className="border rounded-pill border-5" $isOtherPlayer={isOtherPlayer} />
    )
};
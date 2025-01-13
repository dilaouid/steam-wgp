import { StyledTrophy, TrophyProps } from ".";

export const Trophy: React.FC<TrophyProps> = ({ color }) => {
  return (
    <StyledTrophy color={color} />
  );
};
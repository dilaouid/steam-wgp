import { StyledTrophy } from "./Trophy.styled";

interface TrophyProps {
  color?: string;
}

export const Trophy: React.FC<TrophyProps> = ({ color }) => {
  return (
    <StyledTrophy color={color} />
  );
};
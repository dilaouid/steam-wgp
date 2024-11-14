import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import CountUp from "react-countup";

import { Trophy } from "@atoms/homepage/Trophy";
import { GameImage } from "@atoms/homepage/GameImage";

const StyledGameCard = styled.div<{ size: "large" | "small" }>`
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: ${(props) => (props.size === "large" ? "220px" : "200px") };
  height: ${(props) => (props.size === "large" ? "330px" : "270px")};
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px) scale(1.05);
  }
  @media (max-width: 768px) {
    width: ${(props) => (props.size === "large" ? "180px" : "140px")};
    margin-bottom: 20px;
  }
`;

const StyledUpvotes = styled.span<{$color: string}>`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 10px;
  color: ${(props) => props.$color};
  text-shadow: ${(props) => props.$color} 0px 0px 10px;
`;

interface GameCardProps {
    size: 'large' | 'small';
    color: string;
    score: { score: number, game_id: number } | null;
}

export const GameCard: React.FC<GameCardProps> = ({ size, color, score }) => {
  return (
    <StyledGameCard size={size}>
        <Trophy color={color} />
        <GameImage game_id={
          score ? score.game_id : 0
        } golden={size == 'large'} />
        <StyledUpvotes $color={color}>{
          score ?
              <CountUp start={0} end={score.score} duration={2} decimals={2} suffix=" %" enableScrollSpy={true} scrollSpyOnce={true} scrollSpyDelay={150}>
                 {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
          :   <Spinner animation="border" />
        }</StyledUpvotes>
    </StyledGameCard>
  )
};
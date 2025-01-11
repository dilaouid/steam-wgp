import { Spinner } from "react-bootstrap";
import CountUp from "react-countup";

import { Trophy } from "@features/atoms/Homepage/Trophy/Trophy";
import { GameImage } from "@features/atoms/Homepage/GameImage/GameImage";

import { StyledGameCard, StyledUpvotes, GameCardProps } from ".";

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
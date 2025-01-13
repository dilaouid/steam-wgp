import Countdown, { zeroPad } from "react-countdown";
import { useSteamderStore } from "@store/steamderStore";

export const CountDown: React.FC = () => {
    const { steamder } = useSteamderStore();

    return (
        <Countdown date={new Date(steamder?.endTime || 0)} renderer={
            ({ minutes, seconds }) => 
                <span>
                    { zeroPad(minutes) }:{ zeroPad(seconds) }
                </span>
        } />
    )
}
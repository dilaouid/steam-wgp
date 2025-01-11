import { FeaturesHome } from "@features/organisms/Homepage/FeaturesHome"
import { HowTo } from "@features/organisms/Homepage/HowTo"
import { ParallaxBackgroundHome } from "@features/organisms/Homepage/ParallaxBackgroundHome"
import { Podium } from "@features/organisms/Homepage/Podium"
import { StatsHome } from "@features/organisms/Homepage/StatsHome"

export const Homepage = () => {
    return (
    <div style={{ overflowX: 'hidden'}}>
        <ParallaxBackgroundHome />
        <FeaturesHome />
        <StatsHome />
        <Podium />
        <HowTo />
        <hr />
    </div>)
}
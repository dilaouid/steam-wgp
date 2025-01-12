import { FeaturesHome } from "@features/organisms/Homepage/FeaturesHome/FeaturesHome"
import { HowTo } from "@features/organisms/Homepage/HowTo/HowTo"
import { ParallaxBackgroundHome } from "@features/organisms/Homepage/ParallaxBackground/ParallaxBackgroundHome"
import { Podium } from "@features/organisms/Homepage/Podium/Podium"
import { StatsHome } from "@features/organisms/Homepage/StatsHome/StatsHome"

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
import { FeaturesHome } from "components/features/organisms/homepage/FeaturesHome"
import { HowTo } from "components/features/organisms/homepage/HowTo"
import { ParallaxBackgroundHome } from "components/features/organisms/homepage/ParallaxBackgroundHome"
import { Podium } from "components/features/organisms/homepage/Podium"
import { StatsHome } from "components/features/organisms/homepage/StatsHome"

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
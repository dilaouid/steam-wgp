import { FeaturesHome } from "../organisms/homepage/FeaturesHome"
import { HowTo } from "../organisms/homepage/HowTo"
import { ParallaxBackgroundHome } from "../organisms/homepage/ParallaxBackgroundHome"
import { StatsHome } from "../organisms/homepage/StatsHome"

export const Homepage = () => {
    return (
    <div style={{ overflowX: 'hidden'}}>
        <ParallaxBackgroundHome />
        <FeaturesHome />
        <StatsHome />
        <HowTo />
        <hr />
    </div>)
}
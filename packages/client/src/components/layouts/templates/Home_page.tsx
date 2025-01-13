import { FeaturesHome,
        HowTo,
        ParallaxBackgroundHome,
        Podium,
        StatsHome
    } from "@features/organisms/Homepage"

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
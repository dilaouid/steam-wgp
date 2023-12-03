import HomePageChooseActionComponent from "./HomePageChooseAction";
import HomePageHeadingComponent from "./HomePageHeading";
import ModalJoinComponent from "./ModalJoin";

export default function HomePageComponent() {
    return(
    <div>
        <ModalJoinComponent />
        <HomePageHeadingComponent />
        <HomePageChooseActionComponent />
    </div>);
}
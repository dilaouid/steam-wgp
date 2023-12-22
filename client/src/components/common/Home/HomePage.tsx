import HomePageChooseActionComponent from "./HomePageChooseAction";
import HomePageHeadingComponent from "./HomePageHeading";
import ModalJoinComponent from "./ModalJoin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePageComponent() {
    return(
    <div>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            closeButton={false}
            theme="colored"
        />
        <ModalJoinComponent />
        <HomePageHeadingComponent />
        <HomePageChooseActionComponent />
    </div>);
}
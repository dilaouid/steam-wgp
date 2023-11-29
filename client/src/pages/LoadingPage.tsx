import SteamLoadingIcon from "../components/common/Home/Loading";
import HeadingTitleComponent from "../components/common/Login/HeadingTitle";

export default function LoadingPage () {

    return (
        <section className="py-4 py-xl-5">
            <div className="container">
                <div className="text-center p-4 p-lg-5">
                    <div id="sectionHeadingHomepage">
                        <HeadingTitleComponent />
                        <SteamLoadingIcon />
                    </div>
                </div>
            </div>
        </section>
    );
}
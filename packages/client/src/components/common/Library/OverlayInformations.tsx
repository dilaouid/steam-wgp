import ConfirmButtonLibraryComponent from "./ConfirmButtonLibrary";
import SelectedInformationsComponent from "./SelectedInformations";

export default function OverlayInformationsComponent() {
    return (
        <div>
            <SelectedInformationsComponent />
            <ConfirmButtonLibraryComponent />
        </div>
    );
}
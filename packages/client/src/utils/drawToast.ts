import i18n from "../i18n/i18n";
import { toast } from "react-toastify";

export const drawToast = (messageKey: string, method: "warn" | "success" | "error" | "info") => {
    const message = i18n.t(messageKey, { ns: ['global/toast'] })
    toast[method](message, {
        position: "bottom-right",
        autoClose: 2500,
        closeOnClick: true,
        theme: "colored",
        hideProgressBar: true,
    });
};
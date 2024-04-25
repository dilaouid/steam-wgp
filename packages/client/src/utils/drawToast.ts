import i18n from "../i18n/i18n";
import { toast } from "react-toastify";

type ToastMethod = "warn" | "success" | "error" | "info" | "error" | "dark" | "warning";

export const drawToast = (messageKey: string, method: ToastMethod) => {
    const message = i18n.t(messageKey, { ns: ['global/toast'] })
    toast[method](message, {
        position: "bottom-right",
        autoClose: 2500,
        closeOnClick: true,
        theme: "colored",
        hideProgressBar: true,
    });
};
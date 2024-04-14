import { toast } from "react-toastify";

export const drawToast = (message: string, method: "warn" | "success" | "error" | "info") => {
    toast[method](message, {
        position: "bottom-right",
        autoClose: 2500,
        closeOnClick: true,
        theme: "colored",
        hideProgressBar: true,
    });
};
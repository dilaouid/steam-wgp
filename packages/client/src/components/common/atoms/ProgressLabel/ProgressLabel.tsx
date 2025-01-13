import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { BsCheck2All, BsExclamationTriangleFill } from "react-icons/bs";

import { ProgressLabelComponentProps } from ".";

export const ProgressLabel: React.FC<ProgressLabelComponentProps> = ({ type, message, last, complete, count }) => {
    const { t } = useTranslation('pages/login', { keyPrefix: 'loading', i18n: i18next});
    
    if (!last) {
        // If the message is not the last one, we display it in italic
        return <li className={`text-${type}-emphasis`}>{ t(message, { count: count }) }</li>;
    } else if (last && !complete) {
        // If the final message is not complete, we display a spinner icon next to the message
        return (<li className={`fw-bold text-${type}`}>
            <span className="spinner-border spinner-border-sm" role="status"></span> { t(message, { count: count }) }
        </li>)
    } else if (last && complete) {
        // If the final message is a success, we display a check icon, otherwise a warning icon
        const icon = type === 'success' ? <BsCheck2All /> : <BsExclamationTriangleFill />;
        return (<li className={`text-${type}`}>
            {icon} { t(message, { count: count }) }
        </li>)
    }
}
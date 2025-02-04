import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { useAuthStore } from "@store/authStore";
import { useTranslation, Trans } from "react-i18next";

import { ColumnLeft, ActorFont, Hello, ProfilePicture } from "./InformationsLogin.styled";

export const InformationsLogin: React.FC = () => {
    const { t } = useTranslation('pages/login');
    const { user } = useAuthStore();

    return (
    <ColumnLeft lg={{ span: 4, order: 'first' }} sm={{ span: 9, order: 'last' }} className="text-center m-auto" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="250">
        <ProfilePicture className="user-select-none" src={`https://avatars.akamai.steamstatic.com/${user?.avatar_hash}_full.jpg`} />
        <Hello>
            <Trans t={t} i18nKey="greeting" components={{ 1: <span className="fw-bold text-info" /> }} values={{ username: user?.username }} />
        </Hello>

        <ActorFont className="text-body">
            <Trans t={t} i18nKey="what_is_happening" components={{ 1: <strong /> }} />
        </ActorFont>

        <ActorFont className="text-danger" data-aos="zoom-in" data-aos-once="true" data-aos-delay="600" data-aos-duration="1000">
            <BsFillExclamationDiamondFill size={34} /><br />
            <Trans t={t} i18nKey="warning" components={{ 1: <strong /> }} /><br />
            <a href="https://help.steampowered.com/fr/faqs/view/588C-C67D-0251-C276" target="_blank" className="text-success text-decoration-none">{ t('know_more') }</a>
        </ActorFont>

    </ColumnLeft>
    );
};
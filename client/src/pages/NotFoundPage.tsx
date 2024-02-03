import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeadingDiv = styled.div`
    cursor: default;
    user-select: none;
`;

const HeadingLabel = styled.span`
    font-weight: normal !important;
`;

const Image = styled.img`
    width: 235px;
`;

const BottomHeading = styled.h1`
    text-shadow: 0px 0px 20px;
`;

const Button = styled.button`
    box-shadow: 0px 0px 15px 3px #24a3de;
    border-radius: 10px;
`;

export default function NotFoundPage() {

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
    <section className="py-4 py-xl-5" data-aos="zoom-in" data-aos-duration="600" >
    <div className="container">
        <div className="text-center p-4 p-lg-5">
            <HeadingDiv>
                <p className="fw-bold text-primary mb-2">
                    <HeadingLabel>{t('not_found_page_title')}<br />
                    {t('not_found_page_subtitle')}</HeadingLabel>
                </p>
            </HeadingDiv>
        </div>
        <div className="row justify-content-center">
            <div className="col-auto" data-aos="zoom-out">
                <Image src="./assets/img/404.png" />
            </div>
            <div className="col-12" data-aos="zoom-in">
                <BottomHeading className="display-1 text-center text-primary">404</BottomHeading>
            </div>
            <div className="col-auto">
                <Button className="btn btn-primary" type="button" onClick={() => navigate('/steam-wgp/')}>{t('back_homepage')}</Button>
            </div>
        </div>
    </div>
</section>
    );
}
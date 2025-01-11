import { Col, Image } from "."
import HappyPeople from '@assets/images/homepage/features.png';

export const FeaturesImage = () => {
    return (
        <Col>
            <Image alt="Group of person enjoying the view of a controller, teasing the happiness when using SteamWGP" className="img-fluid w-100 h-100 fit-cover user-select-none" data-aos="fade-up" data-aos-duration="500" id="features_image" src={HappyPeople} />
        </Col>
    )
}
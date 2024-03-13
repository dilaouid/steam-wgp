interface FeatureProps {
    last?: boolean;
    children?: React.ReactNode
}

export const FeatureHome: React.FC<FeatureProps> = ({ last, children }) => {
    return(
    <div className={`text-center text-md-start d-flex flex-column align-items-center align-items-md-start mb-5 ${last ? 'mb-5' : ''}`} data-aos="fade-right">
        { children }
    </div>)
};
import Skeleton from "react-loading-skeleton";
import { BsPeople, BsController } from "react-icons/bs";

const ELEMENTS_PER_PAGE = import.meta.env.VITE_STEAMDERS_PER_PAGE;

export const LoadingTable: React.FC = () => {
    
    return (
        <>
            {Array.from({ length: ELEMENTS_PER_PAGE }, (_, index) => (
                <tr key={index}>
                    <td><Skeleton highlightColor="#444" baseColor="#333" width={100+'%'} height={20} enableAnimation /></td>
                    <td><BsPeople /> <Skeleton highlightColor="#444" baseColor="#333" width={80+'%'} height={20} enableAnimation /></td>
                    <td><BsController /> <Skeleton highlightColor="#444" baseColor="#333" width={80+'%'} height={20} enableAnimation /></td>
                    <td><Skeleton highlightColor="#444" baseColor="#333" width={100+'%'} height={20} enableAnimation /></td>
                </tr>
            ))}
        </>
    )
};
import { Pagination } from "react-bootstrap";
import { IPaginationProps } from "./Pagination.props";
import { PaginateItem } from "./Pagination.styled";

export const PaginationSteamders: React.FC<IPaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <Pagination className="d-xxl-flex justify-content-xxl-center" size="sm">
            { totalItems >= 8 && <Pagination.First onClick={() => onPageChange(1)} /> }
            { pages.map(page => (
                <PaginateItem
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </PaginateItem>
            )) }
            { totalItems >= 8 && <Pagination.Last onClick={() => onPageChange(totalPages)} /> }
        </Pagination>
    );
};

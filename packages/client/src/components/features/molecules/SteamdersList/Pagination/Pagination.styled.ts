import { Pagination } from "react-bootstrap";
import styled from "styled-components";

export const PaginateItem = styled(Pagination.Item)`
  --bs-pagination-active-border-color: #d6722a;
  --bs-pagination-active-bg: #d6722a;
  --bs-pagination-hover-bg: #d6682a;
  --bs-pagination-hover-border-color: transparent;
  --bs-pagination-focus-color: var(--bs-warning);
`
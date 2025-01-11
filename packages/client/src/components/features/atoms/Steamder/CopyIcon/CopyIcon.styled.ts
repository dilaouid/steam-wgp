import styled from "styled-components";
import { HiOutlineShare } from "react-icons/hi";

export const StyledIcon = styled(HiOutlineShare)`
  font-size: 24px;
  cursor: pointer;
  transition: .5s;
  opacity: 0.5;
  &:hover {
    color: #f0ad4e;
    transform: scale(1.2);
    opacity: 1;
  }
`;
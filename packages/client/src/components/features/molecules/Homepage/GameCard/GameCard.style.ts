import styled from "styled-components";

export const StyledGameCard = styled.div<{ size: "large" | "small" }>`
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: ${(props) => (props.size === "large" ? "220px" : "200px") };
  height: ${(props) => (props.size === "large" ? "330px" : "270px")};
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px) scale(1.05);
  }
  @media (max-width: 768px) {
    width: ${(props) => (props.size === "large" ? "180px" : "140px")};
    margin-bottom: 20px;
  }
`;

export const StyledUpvotes = styled.span<{$color: string}>`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 10px;
  color: ${(props) => props.$color};
  text-shadow: ${(props) => props.$color} 0px 0px 10px;
`;
import { FC } from "react";
import { styled } from "styled-components";

const StyledLoading = styled.div<{ $loading: boolean }>`
  background-color: #fff;
  padding: 1rem;
  display: ${({ $loading }) => ($loading ? "block" : "none")};
`;

const Loading: FC<{ loading: boolean }> = ({ loading }) => {
  return <StyledLoading $loading={loading}>불러오는 중입니다...</StyledLoading>;
};

export default Loading;

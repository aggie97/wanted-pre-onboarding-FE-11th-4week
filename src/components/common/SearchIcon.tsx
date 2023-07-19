import { styled } from "styled-components";

interface SearchIconProps {
  width: number;
  height: number;
}

export default function SearchIcon({ width, height }: SearchIconProps) {
  return <StyledImage src="/searchIcon.png" width={width} height={height} alt="검색 아이콘" />;
}

const StyledImage = styled.img`
  vertical-align: bottom;
`;

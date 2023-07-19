import { styled } from "styled-components";

export const SearchRecommendBox = styled.ul`
  position: absolute;
  top: 60px;
  left: 0;

  width: 100%;
  min-height: 100px;
  background-color: #fff;
  box-shadow: 0 0 5px 1px rgba(0 0 0/0.1);
  border-radius: 1rem;

  overflow: hidden;

  li {
    display: block;
    width: 100%;
    span {
      display: block;
      padding: 1rem;
    }
  }

  li:first-of-type {
    span {
      color: #888;
    }
  }
`;

export const RecommendedKeyword = styled.li`
  :hover,
  :focus {
    background-color: #eee;
    outline: none;
  }

  a {
    display: flex;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
  }
`;

import { styled } from "styled-components";

export const SearchInputBox = styled.label<{ $focused: boolean }>`
  background-color: #fff;
  border-radius: 42px;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  overflow: hidden;
  outline: 2px solid ${({ $focused }) => ($focused ? "#3479e1" : "none")};
`;

export const StyledSearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  outline: none;
`;

export const SearchInputButton = styled.button`
  min-width: 5rem;
  height: 100%;
  background-color: #3479e1;
  border: 2px solid #3479e1;
  color: #fff;
  padding: 1rem;
  font-weight: 500;
  font-size: 1rem;
`;

import { styled } from "styled-components";

import SickProvider from "context/sickContext";
import SearchForm from "components/searchForm";

export default function Main() {
  return (
    <SearchSection>
      <SearchContainer>
        <h1>
          국내 모든 임상시험 검색하고
          <br /> 온라인으로 참여하기
        </h1>
        <SickProvider>
          <SearchForm />
        </SickProvider>
      </SearchContainer>
    </SearchSection>
  );
}
const SearchSection = styled.section`
  background-color: #cae9ff;
  margin-top: 5rem;
  padding-block: 5rem;
`;

const SearchContainer = styled.div`
  max-width: 1000px;
  margin-inline: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
    font-size: 2.5rem;
    line-height: 4rem;
    padding-bottom: 2rem;
  }
`;

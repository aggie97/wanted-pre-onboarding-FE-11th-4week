import { type ChangeEvent } from "react";

import SearchIcon from "components/common/SearchIcon";
import { useSickListDispatch } from "context/sickContext";
import debounce from "utils/debounce";
import { SearchInputBox, SearchInputButton, StyledSearchInput } from "./searchInput.styles";

export default function SearchInput({ isFocused }: { isFocused: boolean }) {
  const dispatchSick = useSickListDispatch();
  const onChangeInput = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    dispatchSick(inputText);
  }, 500);

  return (
    <SearchInputBox $focused={isFocused}>
      <SearchIcon width={25} height={25} />
      <StyledSearchInput type="search" alt="임상 시험 검색하기" onInput={onChangeInput} />
      <SearchInputButton>검색</SearchInputButton>
    </SearchInputBox>
  );
}

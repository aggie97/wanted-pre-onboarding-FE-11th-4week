import { FocusEvent, useState } from "react";

import Recommend from "components/recommend";
import SearchInput from "components/searchInput";
import { SearchFormBox } from "./searchForm.styles";

export default function SearchForm() {
  const [isFocused, setIsFocused] = useState(false);
  const onFocusForm = () => {
    setIsFocused(true);
  };
  const onBlurForm = (event: FocusEvent<HTMLFormElement>) => {
    // blur시에 relatedTarget이 없으면 focus 취소
    if (!event.relatedTarget) {
      setIsFocused(false);
    }
  };
  return (
    <SearchFormBox onSubmit={(e) => e.preventDefault()} onFocus={onFocusForm} onBlur={onBlurForm}>
      <SearchInput isFocused={isFocused} />
      {isFocused && <Recommend />}
    </SearchFormBox>
  );
}

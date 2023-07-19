# 원티드 프리온보딩 인턴십 4주차 과제

<br>

## 과제 소개

### 1. 한국임상정보(https://clinicaltrialskorea.com/) 검색 영역 클론

![한국임상정보 검색 영역 이미지 예시](https://lean-mahogany-686.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F81d5016d-ca92-494c-a90c-5458ffde01c5%2FUntitled.png?id=ef3667f4-8100-4ce0-8ec5-29dfb94bb8f1&table=block&spaceId=72b256b1-ae08-4e70-bb6c-f9c3cad5a793&width=2000&userId=&cache=v2)

### 2. 질환명 검색 시 API 호출을 통한 검색어 추천 기능 구현

### 3. API 호출 별로 로컬 캐싱 기능 구현

<br>

## API 레포지토리

https://github.com/walking-sunset/assignment-api

<br>

## 커밋 컨벤션

| Tag Name | Description                                           | Gitmoji |
| -------- | ----------------------------------------------------- | :-----: |
| Feature  | 새로운 기능 추가                                      |   ✨    |
| Fix      | 버그 수정                                             |   🐛    |
| Style    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |   💄    |
| Docs     | 문서 수정                                             |   📝    |
| Design   | CSS 등 사용자 UI 변경                                 |   💄    |
| Refactor | 코드 리팩토링                                         |   ♻️    |
| Chore    | 빌드 업무, 패키지 매니저, 패키지 관지라 구성 등 수정  |   📦    |
| Rename   | 파일 혹은 몰더명 수정하거나 옮기는 작업만 한 경우     |   🚚    |
| Remove   | 파일을 삭제하는 작업만 한 경우                        |   🔥    |

<br>

## 기능 구현

### 1. API 호출별로 로컬 캐싱 구현

<img src="https://github.com/aggie97/wanted-pre-onboarding-FE-11th-4week/assets/91879417/6df0c6be-c7e7-499b-99d5-e9c1f35a8471" width="100%" />

입력값(문자열)에 따른 결과값(호출 리턴 배열값)을 `Map`객체로 매핑하여 캐싱을 구현했습니다.

input의 value를 실시간으로 받아온 다음, 항상 `Map`객체의 키와 대조시킵니다.<br>`키가 존재하는 경우` 매핑된 결과값을 반환하게 되고,<br>`존재하지 않는 경우` api 호출 결과값을 반환함과 동시에 캐싱하게 됩니다.

```ts
function QueryCacheService() {
  // 캐싱 저장소 Map 객체 생성
  const queryCacheRepository = new Map<string, Sick[]>();

  let apiCallCount = 0;

  // 쿼리 문자열을 입력으로 받아서 캐싱 저장소에 있는지 검사 후, 데이터 배열을 리턴하는 함수
  async function checkQueryInCache(query: string): Promise<Sick[] | undefined> {
    const isCached = queryCacheRepository.has(query);
    if (isCached) {
      // 캐싱되어 있다면
      return getCachedResult(query); // 캐싱 저장소에서 결과값을 꺼내어 반환
    } // 캐싱되어있지 않다면
    return setResultInCache(query); // api호출 및 캐싱
  }

  // 쿼리 문자열을 받아서 매핑되어 있는 결과값을 가져오는 헬퍼 함수
  function getCachedResult(query: string): Sick[] | undefined {
    return queryCacheRepository.get(query);
  }

  // 쿼리 문자열을 받아서 api 호출 후 결과값을 반환과 동시에 캐싱하는 헬퍼 함수
  async function setResultInCache(query: string): Promise<Sick[] | undefined> {
    console.info("calling api:", ++apiCallCount);
    try {
      const response = await getSicks(query); // api 호출 후 response에 할당
      queryCacheRepository.set(query, response); // {쿼리 문자열: response} 형태로 매핑(캐싱)
      return response; // reponse 반환
    } catch (error) {
      throw new Error((error as AxiosError).message);
    }
  }

  return { checkQueryInCache };
}

export default QueryCacheService;
```

```ts
const { checkQueryInCache } = QueryCacheService();

const dispatchSickList = async (query: string) => {
  // ... validation logic ...
  // 유효성 검사를 모두 통과했다면

  setData((prev) => {
    return { ...prev, loading: true, error: null };
  });
  try {
    // 입력으로 받은 쿼리 문자열과 함께 캐싱 모듈로 넘김.
    const data = await checkQueryInCache(query);
    setData((prev) => {
      return { ...prev, data };
    });
  } catch (error) {
    setData((prev) => {
      return { ...prev, error };
    });
  } finally {
    setData((prev) => {
      return { ...prev, loading: false };
    });
  }
};
```

### 2. 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

input의 value를 실시간으로 받아오는 함수를 setTimeout을 이용한 debounce 함수로 감싸서 무분별한 api 요청을 방지했습니다.

```ts
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
```

정규표현식을 사용하여 입력값(한글)의 각 음절 마다 끊어서 음절이 아닌 경우 api 요청을 방지했습니다.

```ts
const pattern = /[가-힣]/g;
const dispatchSickList = async (query: string) => {
    // 한글 음절 단위로 끊어서 배열로 반환
    // 음절 단위로 끊지 못하면 빈 배열 반환
    const matched = query.match(pattern) ?? [];

    // 검색창이 비어있을 때, api 요청없이 로딩을 멈추고 빈 배열을 반환
    if (query.length === 0 || matched.length === 0) {
      setData((prev) => {
        return { ...prev, loading: false, data: [], error: null };
      });
      return;
    }
```

### 3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현

<img src="https://github.com/aggie97/wanted-pre-onboarding-FE-11th-4week/assets/91879417/2dac400b-a065-410f-b90c-65b8ad18f46e" width="100%" />

input에 foucs가 있는 상태에서 blur 이벤트 발생 시, focus event의 `relatedTarget` 속성을 사용하여 blur event를 취소시켜서 키보드의 `tab`으로 추천 검색어들로 이동 가능하도록 구현했습니다.

```ts
export default function SearchForm() {
  const [isFocused, setIsFocused] = useState(false);
  const onFocusForm = () => {
    setIsFocused(true);
  };
  const onBlurForm = (event: FocusEvent<HTMLFormElement>) => {
    // blur시에 relatedTarget이 존재하면
    if (!event.relatedTarget) {
      // blur 취소
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
```

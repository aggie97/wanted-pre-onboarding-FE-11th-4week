import Loading from "components/common/Loading";
import SearchIcon from "components/common/SearchIcon";
import { useSickList } from "context/sickContext";
import { RecommendedKeyword, SearchRecommendBox } from "./recommend.styles";

export default function Recommend() {
  const { data, loading, error } = useSickList();

  if (error) {
    return <div>데이터를 불러오는 데에 실패했습니다.</div>;
  }

  return (
    <SearchRecommendBox>
      <li>
        <span>추천 검색어</span>
      </li>
      {!loading && data?.length === 0 && (
        <li>
          <span>검색어 없음</span>
        </li>
      )}
      {data?.map((sick) => (
        <RecommendedKeyword key={sick.sickCd}>
          <a href={`/${sick.sickCd}`}>
            <SearchIcon width={20} height={20} />
            {sick.sickNm}
          </a>
        </RecommendedKeyword>
      ))}
      <Loading loading={loading} />
    </SearchRecommendBox>
  );
}

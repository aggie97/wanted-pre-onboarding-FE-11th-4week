import { getSicks } from "api/getSicks";
import { AxiosError } from "axios";
import { Sick } from "types/sick";
// interface

// 1. 유저 입력을 받음.
// 2. 입력값이 cahced이면 캐싱된 결과값을 꺼내어 반환.
// 3. 캐싱된 입력이 아니면 api 요청 후 결과값 캐싱.

// 필요한 것
// 캐싱할 저장 공간

// 기능 함수
// check is query cached

// 헬퍼 함수들
// get cached result
//    (query: string) => <Sick[]> | void
// set result in cache
//    (query: string) => void
// delete query (triggered by staleTime)
//    (query: string) => void

function QueryCacheService() {
  const queryCacheRepository = new Map<string, Sick[]>();
  let apiCallCount = 0;
  async function checkQueryInCache(query: string): Promise<Sick[] | undefined> {
    const isCached = queryCacheRepository.has(query);
    if (isCached) {
      return getCachedResult(query);
    }
    return setResultInCache(query);
  }

  function getCachedResult(query: string): Sick[] | undefined {
    return queryCacheRepository.get(query);
  }

  async function setResultInCache(query: string): Promise<Sick[] | undefined> {
    console.info("calling api:", ++apiCallCount);
    try {
      const response = await getSicks(query);
      queryCacheRepository.set(query, response);
      return response;
    } catch (error) {
      throw new Error((error as AxiosError).message);
    }
  }

  return { checkQueryInCache };
}

export default QueryCacheService;

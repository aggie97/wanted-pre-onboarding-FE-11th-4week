import { type PropsWithChildren, createContext, useContext, useState } from "react";

import { Sick } from "types/sick";
import QueryCacheService from "service/QueryCacheService";

interface SickState {
  data: Sick[] | undefined;
  loading: boolean;
  error: unknown | null;
}

const SickListStateContext = createContext<SickState | null>(null);
const SickListDispatchContext = createContext<((query: string) => void) | null>(null);

export const useSickList = () => {
  const sickState = useContext(SickListStateContext);
  if (!sickState) throw new Error("Cannot find SickProvider");
  return sickState;
};
export const useSickListDispatch = () => {
  const sickDispatch = useContext(SickListDispatchContext);
  if (!sickDispatch) throw new Error("Cannot find SickProvider");
  return sickDispatch;
};

const { checkQueryInCache } = QueryCacheService();

const SickProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<SickState>({
    data: [],
    loading: false,
    error: null,
  });

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

    setData((prev) => {
      return { ...prev, loading: true, error: null };
    });
    try {
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

  return (
    <SickListStateContext.Provider value={data}>
      <SickListDispatchContext.Provider value={dispatchSickList}>
        {children}
      </SickListDispatchContext.Provider>
    </SickListStateContext.Provider>
  );
};

export default SickProvider;

import { useEffect } from "react";

import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

type AsyncThunkAction = (...args: any[]) => any;

interface FetchConfig<T> {
  fetchAction: AsyncThunkAction;
  selector: (state: RootState) => {
    data: T | null;
    loading: boolean;
    error: string | null;
  };
  params?: any;
}

const useFetchData = <T>({ fetchAction, selector, params }: FetchConfig<T>) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(selector);

  useEffect(() => {
    if (params !== undefined) {
      dispatch(fetchAction(params));
    } else {
      dispatch(fetchAction());
    }
  }, [dispatch, fetchAction, params]);

  return { data, loading, error };
};

export default useFetchData;

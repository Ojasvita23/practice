import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";

type AsyncThunkAction = (...args: any[]) => any;

const useFetchData = (fetchAction: AsyncThunkAction, params?: any) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (params !== undefined) {
      dispatch(fetchAction(params));
    } else {
      dispatch(fetchAction());
    }
  }, [dispatch, fetchAction, params]);
};

export default useFetchData;

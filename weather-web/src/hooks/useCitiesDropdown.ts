import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCities } from "../store/reducers/cityReducer";
import { useTypedSelector } from "../store";

export function useCitiesDropdown() {
  const dispatch = useDispatch();
  const {
    data: cities,
    isLoading,
    error,
  } = useTypedSelector((state) => state.cities);

  useEffect(() => {
    dispatch(fetchCities() as any);
  }, []);

  return { cities, isLoading, error };
}

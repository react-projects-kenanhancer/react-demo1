import { useCounterContext } from "..";

export const useIncrement = () => {
  const { dispatch } = useCounterContext();

  return () => dispatch({ type: "INCREMENT" });
};

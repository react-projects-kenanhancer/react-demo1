import { useCounterContext } from "..";

export const useReset = () => {
  const { dispatch } = useCounterContext();

  return () => dispatch({ type: "RESET" });
};

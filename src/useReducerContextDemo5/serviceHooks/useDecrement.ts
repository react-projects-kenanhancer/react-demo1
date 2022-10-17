import { useCounterContext } from "..";

export const useDecrement = () => {
  const { dispatch } = useCounterContext();

  return () => dispatch({ type: "DECREMENT" });
};

import { useCounterContext } from "..";

export const useDecrease = () => {
  const { dispatch } = useCounterContext();

  return (value: number) => dispatch({ type: "DECREASE", value });
};

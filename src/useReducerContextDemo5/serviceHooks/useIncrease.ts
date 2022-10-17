import { useCounterContext } from "..";

export const useIncrease = () => {
  const { dispatch } = useCounterContext();

  return (value: number) => dispatch({ type: "INCREASE", value });
};

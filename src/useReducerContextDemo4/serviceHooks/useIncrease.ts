import { CounterServiceProps } from "../../useReducerContextDemo5/types";

export const useIncrease = ({ dispatch }: CounterServiceProps) => {
  return (value: number) => dispatch({ type: "INCREASE", value });
};

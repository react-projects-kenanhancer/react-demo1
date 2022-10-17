import { CounterServiceProps } from "../../useReducerContextDemo4/types";

export const useDecrease = ({ dispatch }: CounterServiceProps) => {
  return (value: number) => dispatch({ type: "DECREASE", value });
};

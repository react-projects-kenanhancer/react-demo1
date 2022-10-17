import { CounterServiceProps } from "../../useReducerContextDemo5/types";

export const useReset = ({ dispatch }: CounterServiceProps) => {
  return () => dispatch({ type: "RESET" });
};

import { CounterServiceProps } from "../../useReducerContextDemo5/types";

export const useIncrement = ({ dispatch }: CounterServiceProps) => {
  return () => dispatch({ type: "INCREMENT" });
};

import { CounterServiceProps } from "../../useReducerContextDemo5/types";

export const useDecrement = ({ dispatch }: CounterServiceProps) => {
  return () => dispatch({ type: "DECREMENT" });
};

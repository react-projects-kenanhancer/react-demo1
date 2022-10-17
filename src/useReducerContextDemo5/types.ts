import { Dispatch } from "react";

export type CounterStateType = { counter: number };

export type CounterActionType =
  | { type: "INCREMENT" }
  | { type: "INCREASE"; value: number }
  | { type: "DECREMENT" }
  | { type: "DECREASE"; value: number }
  | { type: "RESET" };

export type ServicesType = {
  reset: () => void;
  decrease: (value: number) => void;
  decrement: () => void;
  increase: (value: number) => void;
  increment: () => void;
};

export type CounterContextType = {
  state: CounterStateType;
  dispatch: Dispatch<CounterActionType>;
  services: ServicesType;
};

export type ServicesContextType = {
  state: CounterStateType;
  dispatch: Dispatch<CounterActionType>;
};

export type CounterServiceProps = { dispatch: Dispatch<CounterActionType> };

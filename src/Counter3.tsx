import { Reducer, useEffect, useReducer } from "react";

type CounterState = {
  counter: number;
};

type CounterActions =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "INCREASE"; value: number }
  | { type: "DECREASE"; value: number };

export const counterReducer: Reducer<CounterState, CounterActions> = (
  state,
  action
) => {
  const { type } = action;

  switch (type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    case "RESET":
      return { counter: 0 };
    case "INCREASE":
      return { ...state, counter: state.counter + action.value };
    case "DECREASE":
      return { ...state, counter: state.counter - action.value };
    default:
      throw new Error();
  }
};

export interface CounterProps {
  initialCounter?: number;
}

export const Counter3 = ({ initialCounter = 0 }: CounterProps) => {
  const [counterState, counterDispatch] = useReducer(counterReducer, {
    counter: initialCounter,
  });

  const onReset = () => counterDispatch({ type: "RESET" });
  const onIncrement = () => counterDispatch({ type: "INCREMENT" });
  const onDecrement = () => counterDispatch({ type: "DECREMENT" });
  const onIncrease = () => counterDispatch({ type: "INCREASE", value: 2 });
  const onDecrease = () => counterDispatch({ type: "DECREASE", value: 2 });

  useEffect(() => console.log(counterState.counter), [counterState.counter]);

  return (
    <>
      Count: {counterState.counter}
      <button onClick={onReset}>Reset</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onIncrement}>+</button>
      <button onClick={onIncrease}>Increase by 2</button>
      <button onClick={onDecrease}>Decrease by 2</button>
    </>
  );
};

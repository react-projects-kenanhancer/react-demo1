import { Reducer, useEffect, useReducer } from "react";

type CounterState = {
  counter: number;
  counter2: number;
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
      return { counter: 0, counter2: 0 };
    case "INCREASE":
      return { ...state, counter: state.counter + action.value };
    case "DECREASE":
      return { ...state, counter: state.counter - action.value };
    default:
      throw new Error();
  }
};

const useCounterService = (initialCounter = 0) => {
  const [counterState, counterDispatch] = useReducer(counterReducer, {
    counter: initialCounter,
    counter2: 0,
  });

  const onReset = () => counterDispatch({ type: "RESET" });
  const onIncrement = () => counterDispatch({ type: "INCREMENT" });
  const onDecrement = () => counterDispatch({ type: "DECREMENT" });
  const onIncrease = () => counterDispatch({ type: "INCREASE", value: 2 });
  const onDecrease = () => counterDispatch({ type: "DECREASE", value: 2 });

  return {
    counterState,
    onReset,
    onIncrement,
    onDecrement,
    onIncrease,
    onDecrease,
  };
};

type CounterService = ReturnType<typeof useCounterService>;

export interface CounterProps {
  initialCounter?: number;
}

export const Counter5 = ({ initialCounter = 0 }: CounterProps) => {
  const counterService = useCounterService(initialCounter);

  useEffect(
    () => console.log(counterService.counterState.counter),
    [counterService.counterState.counter]
  );

  return (
    <>
      Count: {counterService.counterState.counter}
      <button onClick={counterService.onReset}>Reset</button>
      <Increaser {...counterService} />
      <Decreaser {...counterService} />
    </>
  );
};

const Increaser = ({ onIncrement, onIncrease, ...rest }: CounterService) => {
  return (
    <>
      <button onClick={onIncrement}>+</button>
      <button onClick={onIncrease}>Increase by 2</button>
      <Decreaser {...rest} />
    </>
  );
};

type DecreaserProps = Pick<CounterService, "onDecrease" | "onDecrement">;
const Decreaser = ({ onDecrement, onDecrease }: DecreaserProps) => {
  return (
    <>
      <button onClick={onDecrement}>-</button>
      <button onClick={onDecrease}>Decrease by 2</button>
    </>
  );
};

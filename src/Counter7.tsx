import { Reducer, useCallback, useEffect, useReducer, useState } from "react";

type AsyncState<R> = {
  status: "idle" | "pending" | "success" | "error";
  loading: boolean;
  error: Error | undefined;
  result: R | undefined;
};

const useAsync = (asyncFunction: () => Promise<void>, immediate = true) => {
  const [state, setState] = useState<AsyncState<any>>({
    status: "idle",
    loading: false,
    error: undefined,
    result: undefined,
  });

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setState({ ...state, loading: true, status: "pending" });
    return asyncFunction()
      .then((response: any) => {
        setState({ ...state, status: "success", result: response });
      })
      .catch((error: Error) => {
        setState({ ...state, status: "error", error });
      })
      .finally(() => setState({ ...state, loading: false }));
  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
};

// An async function for testing our hook.
// Will be successful 50% of the time.
const delayRun = (func: () => void) => {
  return () =>
    new Promise<void>((resolve, reject) => {
      const t1 = setTimeout(() => {
        clearTimeout(t1);
        const rnd = Math.random() * 10;
        // resolve(func());
        rnd <= 5 ? resolve(func()) : reject("Oh no there was an error 😞");
      }, 2000);
    });
};

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

  const onReset = useAsync(
    delayRun(() => counterDispatch({ type: "RESET" })),
    false
  );
  const onIncrement = useAsync(
    delayRun(() => counterDispatch({ type: "INCREMENT" })),
    false
  );
  const onDecrement = useAsync(
    delayRun(() => counterDispatch({ type: "DECREMENT" })),
    false
  );
  const onIncrease = useAsync(
    delayRun(() => counterDispatch({ type: "INCREASE", value: 2 })),
    false
  );
  const onDecrease = useAsync(
    delayRun(() => counterDispatch({ type: "DECREASE", value: 2 })),
    false
  );

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

export const Counter7 = ({ initialCounter = 0 }: CounterProps) => {
  const counterService = useCounterService(initialCounter);

  useEffect(
    () => console.log(counterService.counterState.counter),
    [counterService.counterState.counter]
  );

  return (
    <>
      Count: {counterService.counterState.counter}
      <button onClick={counterService.onReset.execute}>
        Reset[{counterService.onReset.status}]
      </button>
      <Increaser {...counterService} />
      <Decreaser {...counterService} />
    </>
  );
};

const Increaser = ({ onIncrement, onIncrease, ...rest }: CounterService) => {
  return (
    <>
      <button onClick={onIncrement.execute}>+[{onIncrement.status}]</button>
      <button onClick={onIncrease.execute}>
        Increase by 2[{onIncrease.status}]
      </button>
      <Decreaser {...rest} />
    </>
  );
};

type DecreaserProps = Pick<CounterService, "onDecrease" | "onDecrement">;
const Decreaser = ({ onDecrement, onDecrease }: DecreaserProps) => {
  return (
    <>
      <button onClick={onDecrement.execute}>-[{onDecrement.status}]</button>
      <button onClick={onDecrease.execute}>
        Decrease by 2[{onDecrease.status}]
      </button>
    </>
  );
};

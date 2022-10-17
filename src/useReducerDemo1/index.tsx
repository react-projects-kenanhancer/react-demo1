import React, {
  Dispatch,
  Reducer,
  SetStateAction,
  useReducer,
  useState,
} from "react";

const initalState = { counter: 0 };

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "INCREASE"; value: number }
  | { type: "DECREASE"; value: number };

const counterReducer: Reducer<typeof initalState, CounterAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "DECREASE":
      return { ...state, counter: state.counter - action.value };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    case "INCREASE":
      return { ...state, counter: state.counter + action.value };
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    default:
      return state;
  }
};

export default function UseReducerDemo1() {
  return (
    <>
      <Counter1 />
      <Counter2 />
    </>
  );
}

function Counter1() {
  const [state, dispatch] = useReducer(counterReducer, initalState);

  console.log("render");

  return (
    <>
      <h1>UseReducerDemo1-Counter1</h1>
      <Counter1_Dec dispatch={dispatch} />
      ==<b>{state.counter}</b>==
      <Counter1_Inc dispatch={dispatch} />
    </>
  );
}

function Counter1_Dec({ dispatch }: { dispatch: Dispatch<CounterAction> }) {
  const decrement = () => dispatch({ type: "DECREMENT" });

  const decrease = () => dispatch({ type: "DECREASE", value: 5 });
  return (
    <>
      <button onClick={decrement}>Decrement</button>
      <button onClick={decrease}>Decrease</button>
    </>
  );
}

function Counter1_Inc({ dispatch }: { dispatch: Dispatch<CounterAction> }) {
  const increment = () => dispatch({ type: "INCREMENT" });

  const increase = () => dispatch({ type: "INCREASE", value: 5 });
  return (
    <>
      <button onClick={increase}>Increase</button>
      <button onClick={increment}>Increment</button>
    </>
  );
}

function Counter2() {
  const [state, setState] = useState({ counter: 0 });

  return (
    <>
      <h1>UseReducerDemo1-Counter2</h1>
      <Counter2_Dec setState={setState} />
      ==<b>{state.counter}</b>==
      <Counter2_Inc setState={setState} />
    </>
  );
}

function Counter2_Dec({
  setState,
}: {
  setState: Dispatch<SetStateAction<typeof initalState>>;
}) {
  const decrement = () =>
    setState((ps) => ({ ...ps, counter: ps.counter - 1 }));

  const decrease = () => setState((ps) => ({ ...ps, counter: ps.counter - 5 }));

  return (
    <>
      <button onClick={decrement}>Decrement</button>
      <button onClick={decrease}>Decrease</button>
    </>
  );
}

function Counter2_Inc({
  setState,
}: {
  setState: Dispatch<SetStateAction<typeof initalState>>;
}) {
  const increment = () =>
    setState((ps) => ({ ...ps, counter: ps.counter + 1 }));

  const increase = () => setState((ps) => ({ ...ps, counter: ps.counter + 5 }));

  return (
    <>
      <button onClick={increase}>Increase</button>
      <button onClick={increment}>Increment</button>
    </>
  );
}

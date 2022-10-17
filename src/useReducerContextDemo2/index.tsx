import React, {
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
} from "react";

type CounterStateType = { counter: number };

type CounterActionType =
  | { type: "INCREMENT" }
  | { type: "INCREASE"; value: number }
  | { type: "DECREMENT" }
  | { type: "DECREASE"; value: number }
  | { type: "RESET" };

type CounterContextType = {
  state: CounterStateType;
  reset: () => void;
  decrease: (value: number) => void;
  decrement: () => void;
  increase: (value: number) => void;
  increment: () => void;
};

const initalState: CounterStateType = { counter: 0 };

const counterReducer: Reducer<CounterStateType, CounterActionType> = (
  prevState,
  action
) => {
  switch (action.type) {
    case "DECREASE":
      return { ...prevState, counter: prevState.counter - 5 };
    case "DECREMENT":
      return { ...prevState, counter: prevState.counter - 1 };
    case "INCREASE":
      return { ...prevState, counter: prevState.counter + 5 };
    case "INCREMENT":
      return { ...prevState, counter: prevState.counter + 1 };
    case "RESET":
      return initalState;
    default:
      return prevState;
  }
};

const CounterContext = React.createContext<CounterContextType>(
  {} as CounterContextType
);

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(counterReducer, initalState);

  const reset = () => dispatch({ type: "RESET" });

  const decrease = (value: number) => dispatch({ type: "DECREASE", value });

  const decrement = () => dispatch({ type: "DECREMENT" });

  const increase = (value: number) => dispatch({ type: "INCREASE", value });

  const increment = () => dispatch({ type: "INCREMENT" });

  console.log("CounterContextProvider: UseReducerContextDemo2");

  return (
    <CounterContext.Provider
      value={{ state, reset, decrease, decrement, increase, increment }}
    >
      {children}
    </CounterContext.Provider>
  );
};

export function UseReducerContextDemo2() {
  console.log("render: UseReducerContextDemo2");

  return (
    <CounterContextProvider>
      <CounterContainer />
    </CounterContextProvider>
  );
}

function CounterContainer() {
  console.log("render: UseReducerContextDemo2-CounterContainer");

  return (
    <>
      <h1>UseReducerContextDemo2</h1>
      <CounterDec />
      <CounterView />
      <CounterInc />
    </>
  );
}

function CounterDec() {
  const { decrease, decrement } = useContext(CounterContext);

  console.log("render: UseReducerContextDemo2-CounterDec");

  return (
    <>
      <button onClick={decrement}>Derement</button>
      <button onClick={() => decrease(5)}>Decrease</button>
    </>
  );
}

function CounterView() {
  const { state } = useContext(CounterContext);

  console.log("render: UseReducerContextDemo2-CounterView");

  return <b>{state.counter}</b>;
}

function CounterInc() {
  const { increase, increment } = useContext(CounterContext);

  console.log("render: UseReducerContextDemo2-CounterInc");

  return (
    <>
      <button onClick={() => increase(5)}>Increase</button>
      <button onClick={increment}>Increment</button>
    </>
  );
}

import React, {
  Dispatch,
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
  | { type: "DECREASE"; value: number };

type CounterContextType = {
  state: CounterStateType;
  dispatch: Dispatch<CounterActionType>;
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
    default:
      return prevState;
  }
};

const CounterContext = React.createContext<CounterContextType>(
  {} as CounterContextType
);

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(counterReducer, initalState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export function UseReducerContextDemo1() {
  return (
    <CounterContextProvider>
      <CounterContainer />
    </CounterContextProvider>
  );
}

function CounterContainer() {
  return (
    <>
      <h1>UseReducerContextDemo1</h1>
      <Counter_Dec />
      <CounterView />
      <Counter_Inc />
    </>
  );
}

function CounterView() {
  const { state } = useContext(CounterContext);
  return <b>{state.counter}</b>;
}

function Counter_Dec() {
  const { dispatch } = useContext(CounterContext);

  const decrement = () => dispatch({ type: "DECREMENT" });
  const decrease = () => dispatch({ type: "DECREASE", value: 5 });

  return (
    <>
      <button onClick={decrement}>Decrement</button>
      <button onClick={decrease}>Decrease</button>
    </>
  );
}

function Counter_Inc() {
  const { dispatch } = useContext(CounterContext);

  const increase = () => dispatch({ type: "INCREASE", value: 5 });
  const increment = () => dispatch({ type: "INCREMENT" });

  return (
    <>
      <button onClick={increase}>Increase</button>
      <button onClick={increment}>Increment</button>
    </>
  );
}

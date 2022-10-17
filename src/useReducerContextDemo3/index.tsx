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
  | { type: "DECREASE"; value: number }
  | { type: "RESET" };

type ServicesType = {
  reset: () => void;
  decrease: (value: number) => void;
  decrement: () => void;
  increase: (value: number) => void;
  increment: () => void;
};

type CounterContextType = {
  state: CounterStateType;
  services: ServicesType;
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

const useCounterContext = () => useContext(CounterContext);

const useServices = ({
  dispatch,
}: {
  dispatch: Dispatch<CounterActionType>;
}) => {
  const reset = () => dispatch({ type: "RESET" });

  const decrease = (value: number) => dispatch({ type: "DECREASE", value });

  const decrement = () => dispatch({ type: "DECREMENT" });

  const increase = (value: number) => dispatch({ type: "INCREASE", value });

  const increment = () => dispatch({ type: "INCREMENT" });

  return { reset, decrease, decrement, increase, increment };
};

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(counterReducer, initalState);

  const services = useServices({ dispatch });

  return (
    <CounterContext.Provider value={{ state, services }}>
      {children}
    </CounterContext.Provider>
  );
};

export function UseReducerContextDemo3() {
  return (
    <CounterContextProvider>
      <CounterContainer />
    </CounterContextProvider>
  );
}

function CounterContainer() {
  return (
    <>
      <h1>UseReducerContextDemo3</h1>
      <CounterDec />
      <CounterView />
      <CounterInc />
    </>
  );
}

function CounterDec() {
  const {
    services: { decrease, decrement },
  } = useCounterContext();

  return (
    <>
      <button onClick={decrement}>Derement</button>
      <button onClick={() => decrease(5)}>Decrease</button>
    </>
  );
}

function CounterView() {
  const { state } = useCounterContext();

  return <b>{state.counter}</b>;
}

function CounterInc() {
  const {
    services: { increase, increment },
  } = useCounterContext();

  return (
    <>
      <button onClick={() => increase(5)}>Increase</button>
      <button onClick={increment}>Increment</button>
    </>
  );
}

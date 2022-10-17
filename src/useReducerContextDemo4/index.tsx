import React, {
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
} from "react";

import { useServices } from "../useReducerContextDemo5/serviceHooks";
import {
  CounterActionType,
  CounterContextType,
  CounterStateType,
} from "./types";

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

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(counterReducer, initalState);

  const services = useServices({ dispatch });

  return (
    <CounterContext.Provider value={{ state, services }}>
      {children}
    </CounterContext.Provider>
  );
};

export function UseReducerContextDemo4() {
  return (
    <CounterContextProvider>
      <CounterContainer />
    </CounterContextProvider>
  );
}

function CounterContainer() {
  return (
    <>
      <h1>UseReducerContextDemo4</h1>
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

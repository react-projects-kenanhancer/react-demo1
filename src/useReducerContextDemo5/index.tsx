import React, {
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
} from "react";

import { serviceHooks } from "../useReducerContextDemo5/serviceHooks";
import {
  CounterActionType,
  CounterContextType,
  CounterStateType,
  ServicesContextType,
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

const ServicesContext = React.createContext<ServicesContextType>(
  {} as ServicesContextType
);
const CounterContext = React.createContext<CounterContextType>(
  {} as CounterContextType
);

export const useCounterContext = () => useContext(CounterContext);

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(counterReducer, initalState);

  const a1 = Object.keys(serviceHooks).map((item) =>
    serviceHooks[item as keyof typeof serviceHooks]()
  );

  return (
    <ServicesContext.Provider value={{ state, dispatch }}>
      <CounterContext.Provider value={{ state, dispatch, services: a1 }}>
        {children}
      </CounterContext.Provider>
    </ServicesContext.Provider>
  );
};

export function UseReducerContextDemo5() {
  return (
    <CounterContextProvider>
      <CounterContainer />
    </CounterContextProvider>
  );
}

function CounterContainer() {
  return (
    <>
      <h1>UseReducerContextDemo5</h1>
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

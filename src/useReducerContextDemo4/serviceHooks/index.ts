import {
  CounterServiceProps,
  ServicesType,
} from "../../useReducerContextDemo4/types";

import { useReset } from "./useReset";
import { useDecrease } from "./useDecrease";
import { useDecrement } from "./useDecrement";
import { useIncrease } from "./useIncrease";
import { useIncrement } from "./useIncrement";

export const useServices = ({ dispatch }: CounterServiceProps) => {
  return {
    reset: useReset({ dispatch }),
    decrease: useDecrease({ dispatch }),
    decrement: useDecrement({ dispatch }),
    increase: useIncrease({ dispatch }),
    increment: useIncrement({ dispatch }),
  } as ServicesType;
};

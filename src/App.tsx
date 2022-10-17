import React from "react";
import { Counter } from "./counter/Counter";
import { Counter2 } from "./counter/Counter2";
import { Counter3 } from "./counter/Counter3";
import { Counter4 } from "./counter/Counter4";
import { Counter5 } from "./counter/Counter5";
import { Counter6 } from "./counter/Counter6";
import { Counter7 } from "./counter/Counter7";
import { PersonForm } from "./person/PersonForm";
import UseEffectDemo1 from "./useEffectDemo1";
import { UseReducerContextDemo1 } from "./useReducerContextDemo1";
import { UseReducerContextDemo2 } from "./useReducerContextDemo2";
import { UseReducerContextDemo3 } from "./useReducerContextDemo3";
import { UseReducerContextDemo4 } from "./useReducerContextDemo4";
import UseReducerDemo1 from "./useReducerDemo1";
import UseStateDemo1 from "./useStateDemo1";
import UseStateDemo2 from "./useStateDemo2";
import UseStateDemo3 from "./useStateDemo3";

function App() {
  return (
    <>
      <Counter />
      <br />
      <Counter2 />
      <br />
      <Counter3 />
      <br />
      <Counter4 />
      <br />
      <Counter5 />
      <br />
      <Counter6 />
      <br />
      <Counter7 />
      <br />
      <PersonForm />
      <br />
      <UseStateDemo1 />
      <br />
      <UseStateDemo2 />
      <br />
      <UseStateDemo3 />
      <br />
      <UseEffectDemo1 />
      <br />
      <UseReducerDemo1 />
      <br />
      <UseReducerContextDemo1 />
      <br />
      <UseReducerContextDemo2 />
      <br />
      <UseReducerContextDemo3 />
      <br />
      <UseReducerContextDemo4 />
    </>
  );
}

export default App;

import React, { useState } from "react";

const initalState = {
  firstName: "kenan",
  lastName: "hancer",
};

export default function UseStateDemo3() {
  const [state, setState] = useState(initalState);

  const resetInitialState = () => setState(initalState);

  const updateState = () =>
    setState({ firstName: "Kenan", lastName: "Hancer" });

  console.log("render");

  const updateLastName = () =>
    setState((ps) => ({ ...ps, lastName: "HANCER" }));

  return (
    <>
      <StaticTitle />
      <StateLabel myProp={state.lastName} />
      <StateLabel2 {...state} />
      <StateLabel3 {...state} />
      <button onClick={resetInitialState}>Reset Initial State</button>
      <button onClick={updateState}>Update State</button>
      <button onClick={updateLastName}>Update Last Name</button>
    </>
  );
}

function StateLabel({ myProp }: { myProp: string }) {
  const [state] = useState(myProp);

  console.log("render: StateLabel");

  return <div>{state}</div>;
}

function StateLabel2(props: { firstName: string; lastName: string }) {
  const [state] = useState(props);

  console.log("render: StateLabel2");

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <br />
      <StateSubLabel lastName={state.lastName} />
    </>
  );
}

function StateLabel3(props: { firstName: string; lastName: string }) {
  const [state] = useState(() => JSON.stringify(props));

  console.log("render: StateLabel3");

  return <div>{state}</div>;
}

function StateSubLabel({ lastName }: { lastName: string }) {
  console.log("render: StateSubLabel");
  return <div>{lastName}</div>;
}

function StaticTitle() {
  console.log("render: StaticTitle");

  return <h1>State Title</h1>;
}

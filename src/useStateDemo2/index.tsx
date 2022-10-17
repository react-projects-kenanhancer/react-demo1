import React, { useState } from "react";

const initalState = {
  firstName: "kenan",
  lastName: "hancer",
};

export default function UseStateDemo2() {
  const [state, setState] = useState(initalState);

  const resetInitialState = () => setState(initalState);

  const updateState = () =>
    setState({ firstName: "Kenan", lastName: "Hancer" });

  const updateLastName = () =>
    setState((ps) => ({ ...ps, lastName: "HANCER" }));

  console.log("render");

  return (
    <>
      <pre>{JSON.stringify(state)}</pre>
      <button onClick={resetInitialState}>Reset Initial State</button>
      <button onClick={updateState}>Update State</button>
      <button onClick={updateLastName}>Update Last Name</button>
    </>
  );
}

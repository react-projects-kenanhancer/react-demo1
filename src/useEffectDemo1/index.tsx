import React, { useEffect, useState } from "react";

const initalState = { firstName: "kenan", lastName: "hancer" };

export default function UseEffectDemo1() {
  const [state, setState] = useState(initalState);

  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("useEffect cleanUp");
    };
  });

  const updateState = () => setState((ps) => ({ ...ps, lastName: "Hancer" }));

  console.log("render");

  return (
    <>
      <h1>UseEffectDemo1</h1>
      <p>{JSON.stringify(state)}</p>
      <button onClick={updateState}>Update State</button>
    </>
  );
}

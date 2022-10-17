import React, { useEffect, useState } from "react";

export default function UseStateDemo1() {
  const [width, setWidth] = useState(50);

  useEffect(() => {
    console.log("useEffect");
  }, [setWidth]);

  const increaseWidth = () => setWidth((prevState) => prevState + 5);

  console.log("render");

  return (
    <button style={{ width }} onClick={increaseWidth}>
      I grow
    </button>
  );
}

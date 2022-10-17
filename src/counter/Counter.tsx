import React, { useEffect, useState } from "react";

export interface CounterProps {
  initialCount?: number;
}

export const Counter = ({ initialCount = 0 }: CounterProps) => {
  const [count, setCount] = useState(initialCount);

  const onReset = () => {
    setCount(initialCount);
  };

  useEffect(() => console.log(count), [count]);

  return (
    <>
      Count: {count}
      <button onClick={onReset}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  );
};

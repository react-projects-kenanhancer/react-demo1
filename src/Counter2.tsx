import { useEffect, useState } from "react";

export interface CounterProps {
  initialCount?: number;
}

export const Counter2 = ({ initialCount = 0 }: CounterProps) => {
  const [count, setCount] = useState(initialCount);

  const onReset = () => setCount(initialCount);
  const onIncrement = () => setCount((pv) => pv + 1);
  const onDecrement = () => setCount((pv) => pv - 1);

  useEffect(() => console.log(count), [count]);

  return (
    <>
      Count: {count}
      <button onClick={onReset}>Reset</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onIncrement}>+</button>
    </>
  );
};

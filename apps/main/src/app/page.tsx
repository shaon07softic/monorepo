"use client";
import { useCounterStore } from '@acme/state';

export default function Home() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
}

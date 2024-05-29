import { useCounterStore } from "@libs/zustand/counter/use-counter-store";

export default function TestPage() {
  const { count, increment } = useCounterStore();
  return (
    <div>
      <h1 data-testid="heading">test</h1>
      <p data-testid="count">{count}</p>
      <button onClick={increment} data-testid="increment_button">
        increment
      </button>
    </div>
  );
}

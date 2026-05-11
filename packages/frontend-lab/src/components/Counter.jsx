"use client";
import useCounter from "../hooks/useCounter";

const Counter = () => {
  const { handleIncrement, handleDecrement, handleReset, count } = useCounter();
  return (
    <div className={`flex flex-col space-y-6 items-center`}>
      <div className={`flex space-x-6 items-center`}>
        <button
          onClick={handleDecrement}
          aria-label="Decrement (Arrow Down)"
          className="text-2xl bg-red-400 text-white p-4 w-20 h-16 rounded-sm"
        >
          -
        </button>
        <p className="text-4xl w-20 text-center">{count}</p>
        <button
          className="text-2xl bg-green-400 text-white p-4 w-20 h-16 rounded-sm"
          aria-label="Increment (Arrow Up)"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <button
        className="text-xl bg-gray-400 text-white p-4 rounded-sm"
        aria-label="Reset (R)"
        onClick={handleReset}
      >
        Reset
      </button>
      <p className="text-sm text-gray-400 flex gap-3">
        <kbd className="border border-gray-300 rounded px-1.5 py-0.5 font-mono">
          ↑
        </kbd>{" "}
        increment ·{" "}
        <kbd className="border border-gray-300 rounded px-1.5 py-0.5 font-mono">
          ↓
        </kbd>{" "}
        decrement ·{" "}
        <kbd className="border border-gray-300 rounded px-1.5 py-0.5 font-mono">
          R
        </kbd>{" "}
        reset
      </p>
    </div>
  );
};

export default Counter;

import React, { useRef } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";

let store = (set) => ({
  fruits: ["apple", "banana", "orange"],
  addFruits: (fruit) => {
    set((state) => ({
      fruits: [...state.fruits, fruit],
    }));
  },
});

store = persist(store, { name: "basket" });

const useStore = create(store);

const FruitBasket = () => {
  const fruits = useStore((state) => state.fruits);
  const addFruits = useStore((state) => state.addFruits);
  const inputRef = useRef();
  const addFruit = () => {
    addFruits(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div>
      <h1>I have {fruits.length} fruits in my basket</h1>
      <p>Add a new fruit</p>
      <input ref={inputRef} />
      <button onClick={addFruit}>Add a fruit</button>
      {fruits.map((fruit) => (
        <p key={fruit}>{fruit}</p>
      ))}
    </div>
  );
};

export default FruitBasket;

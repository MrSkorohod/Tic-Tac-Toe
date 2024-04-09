'use client';
import { PropsWithChildren, createContext, useContext, useState } from "react";

export enum Color {
  Primary,
  Error,
}

const ColorContext = createContext(Color.Primary);

export default function ColorContextProvider(props: PropsWithChildren) {
  const [color, setColor] = useState(Color.Primary);

  return <ColorContext.Provider value={color}>
    <header>
      <button onClick={() => setColor(Color.Primary)}>Primary</button>
      <button onClick={() => setColor(Color.Error)}>Error</button>
    </header>

    {props.children}
  </ColorContext.Provider>
}

export function useColorContext() {
  return useContext(ColorContext);
}
'use client';
import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface GameContextType {
  history: string[][],
  xIsNext: boolean,
  currentSquares: string[],
  handlePlay: (nextSquares: string[]) => void,
  jumpTo: (nextMove: number) => void,
}


export const GameContext = createContext({} as GameContextType);

export default function GameProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  return (
    <GameContext.Provider value={{
      history,
      xIsNext,
      currentSquares,
      handlePlay,
      jumpTo
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  return useContext(GameContext)
}
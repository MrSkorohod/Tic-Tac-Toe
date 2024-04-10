'use client';
import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

export interface GameContextType {
  history: string[][],
  currentSquares: string[],
  status: string,
  jumpTo: (nextMove: number) => void,
  handleClick: (index: number) => void
}


export const GameContext = createContext({} as GameContextType);

export default function GameProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];


  const winner = calculateWinner(currentSquares);

  const status = useMemo(() => {
    if (winner) {
      return 'Winner: ' + winner;
    } else {
      return 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  }, [winner, xIsNext]);
  

  function handleClick(index: number) {
    if (currentSquares[index] || calculateWinner(currentSquares)) {
      return;
    }

    const nextSquares = currentSquares.slice();

    if (xIsNext) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }

    handlePlay(nextSquares);
  }

  function calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

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
      currentSquares,
      status,
      jumpTo,
      handleClick
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  return useContext(GameContext)
}
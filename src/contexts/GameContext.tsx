'use client';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const noop = () => {};
const defaultHistory = [Array(9).fill(null)];
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

export interface GameContextType {
  history: string[][];
  currentSquares: string[];
  status: string;
  jumpTo: (nextMove: number) => void;
  handleClick: (index: number) => void;
}

export const GameContext = createContext<GameContextType>({
  history: [],
  currentSquares: [],
  status: '',
  jumpTo: noop,
  handleClick: noop,
});

export enum CellValue {
  Empty = '',
  X = 'X',
  O = 'O',
}

export default function GameProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<CellValue[][]>(defaultHistory);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const isXNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);

  const status = useMemo(() => {
    if (winner) {
      return 'Winner: ' + winner;
    } else {
      return 'Next player: ' + (isXNext ? CellValue.X : CellValue.O);
    }
  }, [winner, isXNext]);

  function handleClick(index: number): void {
    if (currentSquares[index] || calculateWinner(currentSquares)) {
      return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[index] = isXNext ? CellValue.X : CellValue.O;
    handlePlay(nextSquares);
  }

  function calculateWinner(squares: CellValue[]): CellValue | null {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handlePlay(nextSquares: CellValue[]): void {
    setHistory((prevHistory) => {
      const nextHistory = prevHistory.slice(0, currentMove + 1);
      nextHistory.push(nextSquares);
      return nextHistory;
    });
    setCurrentMove((move) => move + 1);
  }

  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
  }

  return (
    <GameContext.Provider
      value={{
        history,
        currentSquares,
        status,
        jumpTo,
        handleClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}

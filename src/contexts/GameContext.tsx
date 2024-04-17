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
]; //TODO Change Logic for find a winner

export interface FieldCell {
  yIndex: number | null;
  xIndex: number | null;
  value: CellValue;
}

export type FieldRows = FieldCell[];

export interface GameContextType {
  history: string[][];
  currentSquares: string[];
  status: string;
  numberCellsOnField: number;
  customizeField: boolean;
  field: FieldRows;
  jumpTo: (nextMove: number) => void;
  handleClick: (xIndex: number, yIndex: number) => void;
  changeNumberCellsOnField: (numb: number) => void;
  isCustomizeField: () => void;
}

export const GameContext = createContext<GameContextType>({
  history: [],
  currentSquares: [],
  status: '',
  numberCellsOnField: 3,
  customizeField: false,
  field: [],
  jumpTo: noop,
  handleClick: noop,
  changeNumberCellsOnField: noop,
  isCustomizeField: noop,
});

export enum CellValue {
  Empty = '',
  X = 'X',
  O = 'O',
}

export default function GameProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<CellValue[][]>(defaultHistory);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const [customizeField, setCustomizeField] = useState(false);
  const [numberCellsOnField, setNumberCellsOnField] = useState(3);
  const [field, setField] = useState([] as FieldRows);

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

  function handleClick(xIndex: number, yIndex: number): void {
    // if (currentSquares[index] || calculateWinner(currentSquares)) {
    //   return;
    // }

    // const nextSquares = currentSquares.slice();
    // nextSquares[index] = isXNext ? CellValue.X : CellValue.O;
    // handlePlay(nextSquares);
    setField((prev) => {
      const changedIndex = prev.findIndex(
        (item) => item.xIndex === xIndex && item.yIndex === yIndex
      );
      prev[changedIndex].value = isXNext ? CellValue.X : CellValue.O;
      return prev
    });
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

  function changeNumberCellsOnField(numb: number): void {
    setNumberCellsOnField((prev) => numb);
    setField((prevVal) => {
      let newArr = [...prevVal];
      Array.from(new Array(numb)).forEach((_, xIndex) => {
        Array.from(new Array(numb)).forEach((_, yIndex) => {
          newArr = [
            ...newArr,
            {
              xIndex,
              yIndex,
              value: CellValue.Empty,
            },
          ];
        });
      });
      return newArr;
    });
  }

  function isCustomizeField(): void {
    setCustomizeField((prevValue) => !prevValue);

    if (customizeField) {
      changeNumberCellsOnField(3);
    }
  }

  return (
    <GameContext.Provider
      value={{
        history,
        currentSquares,
        status,
        numberCellsOnField,
        customizeField,
        field,
        jumpTo,
        handleClick,
        changeNumberCellsOnField,
        isCustomizeField,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}

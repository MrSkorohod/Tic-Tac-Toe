'use client';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

const noop = () => {};
const defaultHistory = [Array(9).fill(null)];

export interface FieldCell {
  yIndex: number | null;
  xIndex: number | null;
  value: CellValue;
}

export type FieldRows = CellValue[][];

export interface GameContextType {
  history: string[][];
  currentSquares: string[];
  numberCellsOnField: number;
  customizeField: boolean;
  field: FieldRows;
  jumpTo: (nextMove: number) => void;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeNumberCellsOnField: (numb: number) => void;
  setFieldCustomized: () => void;
  resetStates: () => void;
}

export const GameContext = createContext<GameContextType>({
  history: [],
  currentSquares: [],
  numberCellsOnField: 3,
  customizeField: false,
  field: [],
  jumpTo: noop,
  handleClick: noop,
  changeNumberCellsOnField: noop,
  setFieldCustomized: noop,
  resetStates: noop,
});

export enum CellValue {
  Empty = '',
  X = 'X',
  O = 'O',
}

export default function GameProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<CellValue[][]>(defaultHistory);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const [customizeField, setCustomizeField] = useState<boolean>(false);
  const [numberCellsOnField, setNumberCellsOnField] = useState<number>(3);
  const [field, setField] = useState<FieldRows>([]);

  const isXNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const calculateWinner = useCallback(
    (player: CellValue, rowIndex: number, columnIndex: number): boolean => {
      const maxSizeForWin = numberCellsOnField > 5 ? 5 : numberCellsOnField;

      const countOnDirection = {
        row: {
          count: 1,
          traverse: true,
          reverse: true,
        },
        column: {
          count: 1,
          traverse: true,
          reverse: true,
        },
        diagonal: {
          count: 1,
          traverse: true,
          reverse: true,
        },
        antiDiagonal: {
          count: 1,
          traverse: true,
          reverse: true,
        },
      };


      for (let i = 1; i < maxSizeForWin; i++) {
        // debugger;
        // row traverse
        if (
          countOnDirection.row.traverse &&
          rowIndex + i <= numberCellsOnField &&
          field?.[rowIndex + i]?.[columnIndex] === player
        ) {
          countOnDirection.row.count++;

          if (countOnDirection.row.count === maxSizeForWin) {
            return true;
          }
        } else {
          countOnDirection.row.traverse = false;
        }

        // row reverse
        if (
          countOnDirection.row.reverse &&
          rowIndex - i >= 0 &&
          field?.[rowIndex - i]?.[columnIndex] === player
        ) {
          countOnDirection.row.count++;

          if (countOnDirection.row.count === maxSizeForWin) {
            return true;
          }
        } else {
          countOnDirection.row.reverse = false;
        }

        // column traverse
        if (
          countOnDirection.column.traverse &&
          columnIndex + i <= numberCellsOnField &&
          field?.[rowIndex]?.[columnIndex + i] === player
        ) {
          countOnDirection.column.count++;

          if (countOnDirection.column.count === maxSizeForWin) {
            return true;
          }
        } else {
          countOnDirection.column.traverse = false;
        }

        // column reverse
        if (
          countOnDirection.column.reverse &&
          columnIndex - i >= 0 &&
          field?.[rowIndex]?.[columnIndex - i] === player
        ) {
          countOnDirection.column.count++;

          if (countOnDirection.column.count === maxSizeForWin) {
            return true;
          }
        } else {
          countOnDirection.column.reverse = false;
        }

        // diagonal traverse
        if (
          countOnDirection.diagonal.traverse &&
          rowIndex + i <= numberCellsOnField &&
          columnIndex - i >= 0 &&
          field?.[rowIndex + i]?.[columnIndex - i] === player
        ) {
          countOnDirection.diagonal.count++;

          if (countOnDirection.diagonal.count === maxSizeForWin) {
            return true;
          }
        } else {
          countOnDirection.diagonal.traverse = false;
        }

        // diagonal reverse
        if (
          countOnDirection.diagonal.reverse &&
          columnIndex + i <= numberCellsOnField &&
          rowIndex - i >= 0 &&
          field?.[rowIndex - i]?.[columnIndex + i] === player
        ) {
          countOnDirection.diagonal.count++;

          if (countOnDirection.diagonal.count === maxSizeForWin) {
            return true;
          }
        } else {
          countOnDirection.diagonal.reverse = false;
        }

        // antiDiagonal traverse
        if (
          countOnDirection.antiDiagonal.traverse &&
          columnIndex + i <= numberCellsOnField &&
          rowIndex + i >= 0 &&
          field?.[rowIndex + i]?.[columnIndex + i] === player
        ) {
          countOnDirection.antiDiagonal.count++;

          if (countOnDirection.antiDiagonal.count === maxSizeForWin) {
            return true;
          }
        } else {
          countOnDirection.antiDiagonal.traverse = false;
        }

        // antiDiagonal reverse
        if (
          countOnDirection.antiDiagonal.reverse &&
          rowIndex - i <= numberCellsOnField &&
          columnIndex - i >= 0 &&
          field?.[rowIndex - i]?.[columnIndex - i] === player
        ) {
          countOnDirection.antiDiagonal.count++;

          if (countOnDirection.antiDiagonal.count === maxSizeForWin) {
            return true;
          }
        } else {
          countOnDirection.antiDiagonal.reverse = false;
        }
      }

      return false;
    },
    [numberCellsOnField, field]
  );

  function updateField(rowIndex: number, columnIndex: number): FieldRows {
    const newField = [...field];

    if (!newField[rowIndex]) {
      newField[rowIndex] = [];
    }
    newField[rowIndex][columnIndex] = isXNext ? CellValue.X : CellValue.O;
    return newField;
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    const { rowIndex, columnIndex } = event.currentTarget
      .dataset as unknown as { rowIndex: number; columnIndex: number };
    if (field[rowIndex]?.[columnIndex]) {
      return;
    }
    const newField = updateField(rowIndex, columnIndex);
    const player = newField?.[rowIndex]?.[columnIndex];
    const winner  = calculateWinner(player, +rowIndex, +columnIndex);

    setField(newField);
    setCurrentMove((move) => move + 1);
    if (winner) {
      setTimeout(() => {
        alert(`Winner: ${player}`);
      });
    }
  }

  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
  }

  function changeNumberCellsOnField(numb: number): void {
    setNumberCellsOnField((prev) => numb);
    setField([]);
  }

  function setFieldCustomized(): void {
    setCustomizeField((prevValue) => !prevValue);

    if (customizeField) {
      changeNumberCellsOnField(3);
    }
  }

  function resetStates(): void {
    setCustomizeField(false),
      setNumberCellsOnField(3),
      setField([]),
      setCurrentMove(0);
  }

  return (
    <GameContext.Provider
      value={{
        history,
        currentSquares,
        numberCellsOnField,
        customizeField,
        field,
        jumpTo,
        handleClick,
        changeNumberCellsOnField,
        setFieldCustomized,
        resetStates,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}

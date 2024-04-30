'use client';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

const noop = () => {};

export type FieldRows = CellValue[][];
export interface HistoryData {
  rowIndex: number,
  columnIndex: number,
}

export enum CellValue {
  Empty = '',
  X = 'X',
  O = 'O',
}
export interface GameContextType {
  history: HistoryData[];
  currentSquares: HistoryData | null;
  numberCellsOnField: number;
  customizeField: boolean;
  field: FieldRows;
  winnerInGame: CellValue;
  jumpTo: (nextMove: number) => void;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeNumberCellsOnField: (numb: number) => void;
  setFieldCustomized: () => void;
  resetStates: () => void;
}

export const GameContext = createContext<GameContextType>({
  history: [],
  currentSquares: null,
  numberCellsOnField: 3,
  customizeField: false,
  field: [],
  winnerInGame: CellValue.Empty,
  jumpTo: noop,
  handleClick: noop,
  changeNumberCellsOnField: noop,
  setFieldCustomized: noop,
  resetStates: noop,
});

export default function GameProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<HistoryData[]>([]);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const [customizeField, setCustomizeField] = useState<boolean>(false);
  const [numberCellsOnField, setNumberCellsOnField] = useState<number>(3);
  const [field, setField] = useState<FieldRows>([]);
  const [winnerInGame, setWinner] = useState<CellValue>(CellValue.Empty);

  const isXNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const calculateWinner = useCallback(
    (getCurrent: (index: number) => CellValue, player: CellValue): boolean => {
      let rightIndex = -1;
      const maxSizeForWin = Math.min(numberCellsOnField, 5);
      for (let i = 1; i <= maxSizeForWin; i++) {
        const currentValue = getCurrent(rightIndex === -1 ? i : rightIndex - i);
        if (currentValue === player) {
          continue;
        }
        if (rightIndex === -1) {
          rightIndex = i;
        } else {
          return false;
        }
      }
      return true;
    },
    [numberCellsOnField]
  );

  function determinedWinner(
    field: FieldRows,
    rowIndex: number,
    columnIndex: number
  ) {
    const getRow = (index: number) => {
      return field?.[rowIndex + index]?.[columnIndex];
    };
    const getColl = (index: number) => {
      return field?.[rowIndex]?.[columnIndex + index];
    };

    const getDiagonal = (index: number) => {
      return field?.[rowIndex + index]?.[columnIndex + index];
    };

    const getAntiDiagonal = (index: number) => {
      return field?.[rowIndex - index]?.[columnIndex + index];
    };

    const getterWinPositions = [getRow, getColl, getDiagonal, getAntiDiagonal];

    return getterWinPositions.some((getterWinPosition) =>
      calculateWinner(getterWinPosition, field[rowIndex][columnIndex])
    );
  }

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
    const newField = updateField(+rowIndex, +columnIndex);

    setField(newField);
    setCurrentMove((move) => move + 1);
    setHistory(prevValue => [...prevValue, {rowIndex, columnIndex}]);
    const winner = determinedWinner(newField, +rowIndex, +columnIndex);

    if (winner) {
      setWinner(newField[rowIndex][columnIndex]);
    }
  }

  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
    setField(() => {
      const newField = [] as FieldRows;
      for(let i = 0; i < nextMove; i++) {
        if (!newField[history[i].rowIndex]) {
          newField[history[i].rowIndex] = [];
        }
        newField[history[i].rowIndex][history[i].columnIndex] = i%2 === 0 ? CellValue.X : CellValue.O;
      }
      return newField;
    }
    )
  }

  function changeNumberCellsOnField(numb: number): void {
    const nextHistory = [...history.slice(0, currentMove + 1), {} as HistoryData];
    setHistory(nextHistory);
    setNumberCellsOnField(numb);
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
    setWinner(CellValue.Empty);
    setHistory([])
  }

  return (
    <GameContext.Provider
      value={{
        history,
        currentSquares,
        numberCellsOnField,
        customizeField,
        field,
        winnerInGame,
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

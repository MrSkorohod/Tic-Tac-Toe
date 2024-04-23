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
  handleClick: (xIndex: number, yIndex: number) => void;
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
    (getCurrent: (index: number) => CellValue): CellValue | null => {
      const dialogWinner = Array.from(new Array(numberCellsOnField)).reduce(
        ([player, count], _, idx) => {
          const currValue = getCurrent(idx);

          if (!idx) {
            return [currValue, 1];
          }

          if (player === currValue) {
            return [player, count + 1];
          }

          return [player, 1];
        },
        [undefined, 0]
      );

      if (dialogWinner[1] === numberCellsOnField && dialogWinner[0]) {
        return dialogWinner[0];
      }
      return null;
    },
    [numberCellsOnField]
  );

  function determinedWinner() {
    const getDiagonal = (index: number) => {
      return field?.[index]?.[index];
    };

    const getAntiDiagonal = (index: number) => {
      return field?.[index]?.[numberCellsOnField - index - 1];
    };
    const getterWinPositions = [getDiagonal, getAntiDiagonal];

    for (let i = 0; i < numberCellsOnField; i++) {
      const getRow = (index: number) => {
        return field?.[i]?.[index];
      };
      const getColl = (index: number) => {
        return field?.[index]?.[i];
      };

      getterWinPositions.push(getRow, getColl);
    }


    getterWinPositions.forEach((getterWinPosition) => {
      const winner = calculateWinner(getterWinPosition);
      if (!!winner) {
        alert(`Winner: ${winner}`);
      }

      return !!winner;
    });
  };

  function handleClick(rowIndex: number, columnIndex: number): void {
    if (field[rowIndex]?.[columnIndex]) {
      return;
    }
    setField((prevValue) => {
      const newField = [...prevValue];

      if (!newField[rowIndex]) {
        newField[rowIndex] = [];
      }
      newField[rowIndex][columnIndex] = isXNext ? CellValue.X : CellValue.O;
      return newField;
    });


    setCurrentMove((move) => move + 1);
    determinedWinner();
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

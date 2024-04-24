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
    (getCurrent: (index: number) => CellValue): CellValue | null => {

      let counter = 0;
      let player = null;

      for(let i = 0; i < numberCellsOnField; i++ ){
        const currValue = getCurrent(i);

        if (!i) {
          player = currValue
        }

        if (player === currValue) {
          counter++;
        }
        
        if (i + 1 < length && i % 100 == 0) {
          setTimeout(() => {}, 5);
      }

        player = currValue;
      }

      if (counter === numberCellsOnField && player) {
        return player;
      }
      return null;
    },
    [numberCellsOnField]
  );

  function determinedWinner(field: FieldRows, rowIndex: number, columnIndex: number) {
    const getRow = (index: number) =>  {
      return field?.[rowIndex]?.[index]
    }

    const getColl = (index: number) => {
      return field?.[index]?.[columnIndex];
    };

    const getterWinPositions = [getRow, getColl];

    if(rowIndex === columnIndex) {
      const getDiagonal = (index: number) => {
        return field?.[index]?.[index];
      };
  
      const getAntiDiagonal = (index: number) => {
        return field?.[index]?.[numberCellsOnField - index - 1];
      };

      getterWinPositions.push(getDiagonal, getAntiDiagonal);
    }

    getterWinPositions.forEach((getterWinPosition) => {
      const winner = calculateWinner(getterWinPosition);
      if (!!winner) {
        alert(`Winner: ${winner}`);
      }

      return !!winner;
    });
  };

  function updateField(rowIndex: number, columnIndex: number): FieldRows {
    const newField = [...field];

    if (!newField[rowIndex]) {
      newField[rowIndex] = [];
    }
    newField[rowIndex][columnIndex] = isXNext ? CellValue.X : CellValue.O;
    return newField;
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement> ): void {
    const {rowIndex, columnIndex} = (event.currentTarget.dataset as unknown) as {rowIndex: number, columnIndex: number};
    if (field[rowIndex]?.[columnIndex]) {
      return;
    }
    const newField = updateField(rowIndex, columnIndex);

    setField(newField);
    setCurrentMove((move) => move + 1);
    determinedWinner(newField, rowIndex, columnIndex);
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

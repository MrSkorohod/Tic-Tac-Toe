'use client';
import { useGameContext } from '@/contexts/GameContext';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Cell from '../cell/cell';

export default function Game() {
  const { numberCellsOnField, resetStates } = useGameContext();

  return (
    <AutoSizer defaultHeight={110} defaultWidth={110}>
      {({ height, width }) => (
        <FixedSizeGrid
          columnCount={numberCellsOnField}
          columnWidth={34}
          height={height}
          rowCount={numberCellsOnField}
          rowHeight={34}
          width={width}
        >
          {Cell}
        </FixedSizeGrid>
      )}
    </AutoSizer>
  );
}

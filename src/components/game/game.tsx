'use client';
import {
  Box,
  Button,
} from '@mui/material';
import { useGameContext } from '@/contexts/GameContext';
import NextLink from 'next/link';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Cell from '../cell/cell';

export default function Game() {
  const { numberCellsOnField, resetStates } = useGameContext();

  return (
    <>
      <Box>
        <Button
          variant="contained"
          component={NextLink}
          href="/"
          sx={{
            mb: '20px',
          }}
          onClick={() => resetStates()}
        >
          Return Back
        </Button>
      </Box>
      <Box
        display="flex"
        sx={{
          height: '50vh',
        }}
      >
        <Box display="flex" flexDirection="column">
          <div style={{ height: '100%', width: '50vw' }}>
            <AutoSizer style={{ minWidth: '100%' }}>
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
          </div>
        </Box>
      </Box>
    </>
  );
}

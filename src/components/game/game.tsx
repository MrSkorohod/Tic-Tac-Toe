'use client';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useGameContext } from '@/contexts/GameContext';
import { useMemo } from 'react';
import NextLink from 'next/link';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

export default function Game() {
  const {
    field,
    history,
    numberCellsOnField,
    jumpTo,
    resetStates,
    handleClick,
  } = useGameContext();

  const moves = useMemo(
    () =>
      history.map((squares, move) => {
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <ListItem
            disablePadding
            key={move}
          >
            <ListItemButton
              sx={{ p: '0 5px', m: '5px 0', border: '1px solid grey' }}
              onClick={() => jumpTo(move)}
            >
              <ListItemText primary={description} />
            </ListItemButton>
          </ListItem>
        );
      }),
    [history, jumpTo]
  );

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: {};
  }) => (
    <div
      style={{
        ...style,
        border: '1px solid black',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: '34px',
        cursor: 'pointer',
      }}
      onClick={() => handleClick(rowIndex, columnIndex)}
    >
     {field?.[rowIndex]?.[columnIndex]}
    </div>
  );

  return (
    <Box display='flex' sx={{
      height: '50vh'
    }}>
      <Box display='flex' flexDirection='column'>
        <div style={{ height: '100%', width: '50vw' }}>
          <AutoSizer style={{ minWidth: '100%'}}>
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
        <Button
          variant='contained'
          component={NextLink}
          href='/'
          sx={{
            mt: '20px',
          }}
          onClick={() => resetStates()}
        >
          Return Back
        </Button>
      </Box>
      <Box>
        <Box p={2}>
          <List>{moves}</List>
        </Box>
      </Box>
    </Box>
  );
}

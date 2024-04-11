'use client';
import { useGameContext } from '@/contexts/GameContext';
import Square from '../square/square';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';

export default function Board() {
  const { currentSquares, status, handleClick } = useGameContext();

  const cells = useMemo(
    () =>
      Array.from(new Array(3)).map((_, i) => {
        const cellsArr = [
          i * 3,
          i * 3 + 1,
          i * 3 + 2
        ];
        return (
          <Grid
            item
            key={i}
          >
            {cellsArr.map((item) => (
              <Square
                key={item}
                value={currentSquares[item]}
                onSquareClick={() => handleClick(item)}
              />
            ))}
          </Grid>
        );
      }),
    [currentSquares, handleClick]
  );

  function Rows() {
    return (
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        {cells}
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <Typography
          variant='h6'
          component='h6'
        >
          {status}
        </Typography>
        <Rows />
      </Grid>
    </Grid>
  );
}

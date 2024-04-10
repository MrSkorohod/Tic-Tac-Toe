'use client';
import { useGameContext } from '@/contexts/GameContext';
import Square from '../square/square';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Board() {
  

  const { currentSquares, status, handleClick } = useGameContext();


  function renderCells(numberCell: number[]) {
    return numberCell.map((item) => (
      <Square
        key={item}
        value={currentSquares[item]}
        onSquareClick={() => handleClick(item)}
      />
    ));
  }

  function Rows() {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {Array.from(new Array(3)).map((_, i) => {
          const cellsArr = i === 0 ? [0, 1, 2] : i === 1 ? [3, 4, 5] : [6, 7, 8];
          return (
            <Grid item key={i}>
              {renderCells(cellsArr)}
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h6" component="h6">
          {status}
        </Typography>
        <Rows />
      </Grid>
    </Grid>
  );
}

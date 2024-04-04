'use client';
import Square from '../square/square';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: string[];
  onPlay: Function;
}) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(index: number) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }

    onPlay(nextSquares);
  }

  function renderCells(numberCell: number[]) {
    return numberCell.map((item) => (
      <Square
        key={item}
        value={squares[item]}
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
          const celsArr = i === 0 ? [0, 1, 2] : i === 1 ? [3, 4, 5] : [6, 7, 8];
          return (
            <Grid item key={i}>
              {renderCells(celsArr)}
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

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

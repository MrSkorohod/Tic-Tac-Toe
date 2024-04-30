import { useGameContext } from '@/contexts/GameContext';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';

export default function History() {
  const { history, jumpTo } = useGameContext();

  const moves = useMemo(
    () =>
      history.map((squares, move) => {
        const description = 'Go to move #' + (move + 1);
        return (<MoveButton moveIndex={move + 1} jumpTo={jumpTo} key={move + 1} description={description}/>);
      }),
    [history, jumpTo]
  );
  return (
    <>
      <Typography>History Game</Typography>
      <MoveButton moveIndex={0} jumpTo={jumpTo} description='Go to game start'/>
      {moves}
    </>
  );
}

function MoveButton({
  moveIndex,
  description,
  jumpTo,
}: {
  moveIndex: number;
  description: string;
  jumpTo: (index: number) => void;
}) {
  return (
    <ListItem disablePadding key={moveIndex}>
      <ListItemButton
        sx={{ p: '0 5px', m: '5px 0', border: '1px solid grey' }}
        onClick={() => jumpTo(moveIndex)}
      >
        <ListItemText primary={description} />
      </ListItemButton>
    </ListItem>
  );
}

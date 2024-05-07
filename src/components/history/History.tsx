import { useGameContext } from '@/contexts/GameContext';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { FixedSizeList } from 'react-window';

export default function History() {
  const { history, jumpTo } = useGameContext();

  const moves = useMemo(
    () =>
      history.map((squares, move) => {
        const description = 'Go to move #' + (move + 1);
        return (<MoveButton  jumpTo={() => jumpTo(move + 1)} key={move + 1} description={description}/>);
      }),
    [history, jumpTo]
  );
  return (
    <>
      <Typography>History Game</Typography>
      <MoveButton jumpTo={() => jumpTo(0)} description='Go to game start'/>
      {/* <FixedSizeList></FixedSizeList> */}
      {moves}
    </>
  );
}

function MoveButton({
  description,
  jumpTo
}: {
  description: string;
  jumpTo: () => void;
}) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{ p: '0 5px', m: '5px 0', border: '1px solid grey' }}
        onClick={jumpTo}
      >
        <ListItemText primary={description} />
      </ListItemButton>
    </ListItem>
  );
}

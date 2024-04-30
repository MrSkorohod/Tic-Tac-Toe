import { useGameContext } from "@/contexts/GameContext";
import { ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useMemo } from "react";

export default function History(){
  const { history, jumpTo } =
  useGameContext();

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
  return (<>
  <Typography>History Game</Typography>
  {moves}
  </>)
}
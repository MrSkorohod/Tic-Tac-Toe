import { useGameContext } from "@/contexts/GameContext";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useMemo, useState } from "react";

export default function WinnerSnackbar() {
  const [open, setOpen] = useState(false);
  const { winnerInGame } = useGameContext();

  const handleOpen = useMemo(() => setOpen(!!winnerInGame), [winnerInGame]);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false);
  };

  return (
    <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
    <Alert
      onClose={handleClose}
      severity='success'
      sx={{ width: '300px' }}
    >
      <AlertTitle>Winner!</AlertTitle>
      Player {winnerInGame} win
    </Alert>
  </Snackbar>
  )
}
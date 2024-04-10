import Game from '@/components/game/game';
import GameProvider from '@/contexts/GameContext';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box
      sx={{
        m: 4,
      }}
    >
      <GameProvider>
        <Game />
      </GameProvider>
    </Box>
  );
}

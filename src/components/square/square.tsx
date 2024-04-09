import { ReactEventHandler } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useColorContext } from '@/contexts/ColorContext';

interface SquareProps {
  value: string | null;
  onSquareClick: ReactEventHandler;
}

export default function Square({ value, onSquareClick }: SquareProps) {
  const color = useColorContext();
  const theme = useTheme();

  return (
      <Button
        variant="text"
        sx={{
          color: color ? theme.palette.primary.light : theme.palette.primary.dark,
          width: 34,
          border: 1,
          borderRadius: 0,
          float: 'left',
          fontSize: 24,
          fontWeight: 'bold',
          lineHeight: '34px',
          height: 34,
          mr: '-1px',
          mt: '-1px',
          p: 0,
          textAlign: 'center',
          borderColor: color ? theme.palette.error.main : theme.palette.primary.main,
        }}
        onClick={onSquareClick}
      >
        {value}
      </Button>
  );
}

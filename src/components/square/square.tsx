import { ReactEventHandler } from 'react';
import Button from '@mui/material/Button';

interface SquareProps {
  value: string | null;
  onSquareClick: ReactEventHandler;
}

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
      <Button
        variant="text"
        sx={{
          color: 'primary.dark',
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
          borderColor: 'primary.main',
        }}
        onClick={onSquareClick}
      >
        {value}
      </Button>
  );
}
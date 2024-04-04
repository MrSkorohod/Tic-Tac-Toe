import { ReactEventHandler } from 'react';
import styleSquare from './square.module.css';
import Button from '@mui/material/Button';

interface SquareProps {
  value: string | null;
  onSquareClick: ReactEventHandler;
}

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <Button
      variant="text"
      className={styleSquare.square}
      onClick={onSquareClick}
    >
      {value}
    </Button>
  );
}

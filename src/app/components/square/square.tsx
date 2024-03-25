import { ReactEventHandler } from 'react';
import styleSquare from './square.module.css';

interface SquareProps {
  value: string | null;
  onSquareClick: ReactEventHandler;
}

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className={styleSquare.square} onClick={onSquareClick}>
      {value}
    </button>
  );
}

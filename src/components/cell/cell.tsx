import { useGameContext } from '@/contexts/GameContext';
import { Button } from '@mui/material';
import { useCallback } from 'react';


const cellStyle = {
  border: '1px solid black',
  textAlign: 'center',
  fontSize: 24,
  borderRadius: '0',
  height: '34px',
  minWidth: '34px',
  p: 0
};


export default function Cell({
  columnIndex,
  rowIndex,
  style,
}: {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
}) {
  const { field, handleClick } = useGameContext();

  return (
    <Button
      style={style}
      sx={cellStyle}
      data-column-index={columnIndex}
      data-row-index={rowIndex}
      onClick={handleClick}
    >
      
      {field?.[rowIndex]?.[columnIndex]}
    </Button>
  );
}

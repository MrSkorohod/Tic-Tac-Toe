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

  const onClick = useCallback(() => handleClick(rowIndex, columnIndex), [columnIndex, rowIndex, handleClick]);


  return (
    <Button
      style={style}
      sx={{
        ...cellStyle
      }}
      onClick={onClick}
    >
      
      {field?.[rowIndex]?.[columnIndex]}
    </Button>
  );
}

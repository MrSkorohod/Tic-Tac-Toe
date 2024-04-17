'use client';
import { CellValue, FieldRows, useGameContext } from '@/contexts/GameContext';
import Square from '../square/square';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { FixedSizeGrid } from 'react-window';

export default function Board() {
  const { currentSquares, status,field,  numberCellsOnField, handleClick } =
    useGameContext();



  // const cells = useMemo(
  //   () =>
  //     Array.from(new Array(numberCellsOnField)).map((_, i) => {
  //       const cellsArr = Array.from(new Array(numberCellsOnField)).map(
  //         (item, idx) => (item = i * numberCellsOnField + idx)
  //       );
  //       return cellsArr.map((item) => (
  //         <Square
  //           key={item}
  //           value={currentSquares[item]}
  //           onSquareClick={() => handleClick(item)}
  //         />
  //       ));
  //     }),
  //   [currentSquares, numberCellsOnField, handleClick]
  // );


  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: {};
  }) => (
    <div
      style={{
        ...style,
        border: '1px solid black',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: '34px',
        cursor: 'pointer'
      }}
      onClick={() => handleClick(columnIndex, rowIndex )}
    >
      {field.find((item) => item.xIndex === columnIndex && item.yIndex === rowIndex)?.value}
    </div>
  );

  return (
    <>
      <Typography variant="h6" component="h6">
        {status}
      </Typography>

      <FixedSizeGrid
        columnCount={numberCellsOnField}
        columnWidth={34}
        height={150}
        rowCount={numberCellsOnField}
        rowHeight={34}
        width={300}
      >
        {Cell}
      </FixedSizeGrid>
    </>
  );
}

import React, { useEffect, useState } from 'react';

const numRows = 50;
const numCols = 50;

// Operations to calculate neighbors
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState(() => generateEmptyGrid());

  // Randomly fill the grid at the start
  useEffect(() => {
    const randomGrid = grid.map(rows => 
      rows.map(() => (Math.random() > 0.7 ? 1 : 0))
    );
    setGrid(randomGrid);
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white"
    >
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = JSON.parse(JSON.stringify(grid));
                newGrid[i][k] = grid[i][k] ? 0 : 1;
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? 'pink' : undefined,
                border: 'solid 1px gray'
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameOfLife;
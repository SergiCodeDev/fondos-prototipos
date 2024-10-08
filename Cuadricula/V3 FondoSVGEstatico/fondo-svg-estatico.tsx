import React from 'react'

interface FondoSVGEstaticoProps {
  width?: number | string
  height?: number | string
  gridWidth?: number
  gridHeight?: number
  fillPercentage?: number
  lineColor?: string
  lineOpacity?: number
  squareColor?: string
  squareOpacity?: number
  className?: string
  children?: React.ReactNode
}

const FondoSVGEstatico: React.FC<FondoSVGEstaticoProps> = ({
  width = '100%',
  height = 'auto',
  gridWidth = 50,
  gridHeight = 50,
  fillPercentage = 20,
  lineColor = 'rgb(0,0,0)',
  lineOpacity = 1,
  squareColor = 'black',
  squareOpacity = 1,
  className = '',
  children,
}) => {
  // Calcular el número de columnas y filas según el ancho y alto del contenedor
  const actualWidth = typeof width === 'number' ? width : 1920 // Usar un valor predeterminado si el ancho es '100%'
  const actualHeight = typeof height === 'number' ? height : 1080 // Usar un valor predeterminado si la altura es 'auto'

  const numCols = Math.ceil(actualWidth / gridWidth)
  const numRows = Math.ceil(actualHeight / gridHeight)

  const svgWidth = numCols * gridWidth
  const svgHeight = numRows * gridHeight

  // Generar la cuadrícula de rectángulos de forma consistente
  const generateGrid = () => {
    const grid = []
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (Math.random() * 100 < fillPercentage) {
          grid.push(
            <rect
              key={`${row}-${col}`}
              x={col * gridWidth}
              y={row * gridHeight}
              width={gridWidth}
              height={gridHeight}
              fill={squareColor}
              opacity={squareOpacity}
            />
          )
        }
      }
    }
    return grid
  }

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
      }}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      >
        <defs>
          <pattern
            id={`grid-${gridWidth}-${gridHeight}`}
            width={gridWidth}
            height={gridHeight}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridWidth} 0 L 0 0 0 ${gridHeight}`}
              fill="none"
              stroke={lineColor}
              strokeWidth="1"
              strokeOpacity={lineOpacity}
            />
          </pattern>
        </defs>

        <rect
          width={svgWidth}
          height={svgHeight}
          fill={`url(#grid-${gridWidth}-${gridHeight})`}
        />
        {generateGrid()}
      </svg>

      {/* Renderizar los hijos en la parte superior */}
      <div style={{ position: 'relative', zIndex: 2 }} className={className}>
        {children}
      </div>
    </div>
  )
}

export default FondoSVGEstatico

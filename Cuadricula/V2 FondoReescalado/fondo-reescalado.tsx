import React from 'react'

interface FondoReescaladoProps {
  width?: string | number
  height?: string | number
  gridWidth?: number
  gridHeight?: number
  fillPercentage?: number
  lineColor?: string
  lineOpacity?: number
  squareColor?: string
  squareOpacity?: number
  className?: string
  children?: React.ReactNode // Aceptar elementos hijos
}

const FondoReescalado: React.FC<FondoReescaladoProps> = ({
  width = '100%',
  height = 'auto',
  gridWidth,
  gridHeight,
  fillPercentage = 20,
  lineColor = 'rgb(0,0,0)',
  lineOpacity = 1,
  squareColor = 'black',
  squareOpacity = 1,
  className = '',
  children,
}) => {
  // Calcular el tamaño final del grid
  const finalGridWidth = gridWidth || gridHeight || 50
  const finalGridHeight = gridHeight || gridWidth || 50

  // Proporciones predeterminadas si el ancho o la altura son desconocidos
  const defaultWidth = 1000
  const defaultHeight = 1000

  // Asegurarse de que `width` y `height` sean numéricos si no son `100%` o `auto`
  const numericWidth = typeof width === 'number' ? width : defaultWidth
  const numericHeight = typeof height === 'number' ? height : defaultHeight

  // Calcular el número de filas y columnas
  const numCols = Math.ceil(numericWidth / finalGridWidth)
  const numRows = Math.ceil(numericHeight / finalGridHeight)

  // Calcular el tamaño real que el SVG cubrirá
  const actualWidth = numCols * finalGridWidth
  const actualHeight = numRows * finalGridHeight

  // Generar la cuadrícula
  const generateGrid = () => {
    const grid = []
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (Math.random() * 100 < fillPercentage) {
          grid.push(
            <rect
              key={`${row}-${col}`}
              x={col * finalGridWidth}
              y={row * finalGridHeight}
              width={finalGridWidth}
              height={finalGridHeight}
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
        width="100%"
        height="100%"
        viewBox={`0 0 ${actualWidth} ${actualHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      >
        <defs>
          <pattern
            id={`grid-${finalGridWidth}-${finalGridHeight}`}
            width={finalGridWidth}
            height={finalGridHeight}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${finalGridWidth} 0 L 0 0 0 ${finalGridHeight}`}
              fill="none"
              stroke={lineColor}
              strokeWidth="1"
              strokeOpacity={lineOpacity}
            />
          </pattern>
        </defs>

        <rect
          width={actualWidth}
          height={actualHeight}
          fill={`url(#grid-${finalGridWidth}-${finalGridHeight})`}
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

export default FondoReescalado

interface SVGBackgroundProps {
  width?: number
  height?: number
  gridWidth?: number
  gridHeight?: number
  fillPercentage?: number
  lineColor?: string
  lineOpacity?: number
  squareColor?: string
  squareOpacity?: number
}

export default function SVGBackground({
  width = 1000,
  height = 1000,
  gridWidth,
  gridHeight,
  fillPercentage = 10,
  lineColor = 'rgb(0,0,0)',
  lineOpacity = 1,
  squareColor = 'black',
  squareOpacity = 1,
}: SVGBackgroundProps = {}) {
  const finalGridWidth = gridWidth || gridHeight || 50
  const finalGridHeight = gridHeight || gridWidth || 50

  const numCols = Math.ceil(width / finalGridWidth)
  const numRows = Math.ceil(height / finalGridHeight)

  const actualWidth = numCols * finalGridWidth
  const actualHeight = numRows * finalGridHeight

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
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${actualWidth} ${actualHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
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
    </div>
  )
}

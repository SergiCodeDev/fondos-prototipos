import React from 'react'

interface Base64FondoProps {
  width?: string
  height?: string
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

const Base64Fondo: React.FC<Base64FondoProps> = ({
  width = '100%',
  height = '100%',
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
  // Generate SVG content on the server-side
  const svgContent = generateSVGContent({
    width: 1920,
    height: 1080,
    gridWidth,
    gridHeight,
    fillPercentage,
    lineColor,
    lineOpacity,
    squareColor,
    squareOpacity,
  })

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          svgContent
        )}")`,
        backgroundPosition: 'top center',
        backgroundRepeat: 'repeat',
      }}
      className={className}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  )
}

// Function to generate SVG content
function generateSVGContent({
  width,
  height,
  gridWidth,
  gridHeight,
  fillPercentage,
  lineColor,
  lineOpacity,
  squareColor,
  squareOpacity,
}: {
  width: number
  height: number
  gridWidth: number
  gridHeight: number
  fillPercentage: number
  lineColor: string
  lineOpacity: number
  squareColor: string
  squareOpacity: number
}) {
  const numCols = Math.ceil(width / gridWidth)
  const numRows = Math.ceil(height / gridHeight)

  let squares = ''
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (Math.random() * 100 < fillPercentage) {
        squares += `<rect x="${col * gridWidth}" y="${
          row * gridHeight
        }" width="${gridWidth}" height="${gridHeight}" fill="${squareColor}" opacity="${squareOpacity}" />`
      }
    }
  }

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="${gridWidth}" height="${gridHeight}" patternUnits="userSpaceOnUse">
          <path d="M ${gridWidth} 0 L 0 0 0 ${gridHeight}" fill="none" stroke="${lineColor}" stroke-width="1" stroke-opacity="${lineOpacity}" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      ${squares}
    </svg>
  `
}

export default Base64Fondo

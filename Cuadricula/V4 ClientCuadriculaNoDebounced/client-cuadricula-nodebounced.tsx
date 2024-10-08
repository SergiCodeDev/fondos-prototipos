'use client'

import React, { useEffect, useState } from 'react'

interface ClientCuadriculaNoDebouncedProps {
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

const ClientCuadriculaNoDebounced: React.FC<
  ClientCuadriculaNoDebouncedProps
> = ({
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('svg-container')
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const numCols = Math.ceil(dimensions.width / gridWidth)
  const numRows = Math.ceil(dimensions.height / gridHeight)

  const svgWidth = numCols * gridWidth
  const svgHeight = numRows * gridHeight

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
      id="svg-container"
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

      <div style={{ position: 'relative', zIndex: 2 }} className={className}>
        {children}
      </div>
    </div>
  )
}

export default ClientCuadriculaNoDebounced

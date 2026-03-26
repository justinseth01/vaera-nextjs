'use client'

import { useState, useEffect } from 'react'

const GRID_SIZE = 9
const SCAN_SPEED = 100

// Generate pseudo-random density values for the grid
const generateDensityGrid = () => {
  const grid = []
  const center = (GRID_SIZE - 1) / 2
  for (let row = 0; row < GRID_SIZE; row++) {
    const rowData = []
    for (let col = 0; col < GRID_SIZE; col++) {
      // Create organic-looking density patterns
      const baseValue = 0.3 + Math.sin(row * 0.8) * 0.2 + Math.cos(col * 0.6) * 0.2
      const noise = (Math.random() - 0.5) * 0.3
      rowData.push(Math.max(0.1, Math.min(1, baseValue + noise)))
    }
    grid.push(rowData)
  }
  return grid
}

// Generate random pore positions for each cell
const generatePorePattern = () => {
  const pores = []
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cellPores = []
    const numPores = Math.floor(Math.random() * 3) + 2
    for (let j = 0; j < numPores; j++) {
      cellPores.push({
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
        size: 1 + Math.random() * 2,
      })
    }
    pores.push(cellPores)
  }
  return pores
}

// Check if cell is within circular mask
const isInCircle = (row, col, gridSize) => {
  const center = (gridSize - 1) / 2
  const distance = Math.sqrt(Math.pow(row - center, 2) + Math.pow(col - center, 2))
  return distance <= center + 0.5
}

export default function DensityHeatmapAnimation() {
  const [scanLine, setScanLine] = useState(-1)
  const [densityGrid] = useState(generateDensityGrid)
  const [porePattern] = useState(generatePorePattern)

  useEffect(() => {
    let scanIndex = -1

    const interval = setInterval(() => {
      scanIndex++

      if (scanIndex <= GRID_SIZE + 1) {
        setScanLine(scanIndex)
      } else if (scanIndex > GRID_SIZE + 15) {
        // Reset animation after pause
        scanIndex = -1
        setScanLine(-1)
      }
      // Pause for ~15 ticks (1.5s) at the end to let viewer see completed grid
    }, SCAN_SPEED)

    return () => clearInterval(interval)
  }, [])

  const getDensityColor = (density, isRevealed) => {
    if (!isRevealed) return 'rgba(252, 243, 232, 0.3)'

    // Interpolate between light cream and slightly deeper tone based on density
    // Light: #fcf3e8 (252, 243, 232) -> Deep: #e8d5c4 (232, 213, 196)
    const r = Math.round(252 - density * 20)
    const g = Math.round(243 - density * 30)
    const b = Math.round(232 - density * 36)
    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      {/* Grid container */}
      <div className="relative">
        {/* Circular skin patch background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fcf3e8] to-[#f0e4d8] opacity-30 scale-110" />

        {/* Density grid - circular shape */}
        <div
          className="grid gap-1 p-3 relative"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {densityGrid.map((row, rowIndex) =>
            row.map((density, colIndex) => {
              const isRevealed = rowIndex < scanLine
              const isScanning = rowIndex === scanLine
              const inCircle = isInCircle(rowIndex, colIndex, GRID_SIZE)
              const cellIndex = rowIndex * GRID_SIZE + colIndex

              if (!inCircle) {
                return <div key={`${rowIndex}-${colIndex}`} className="w-6 h-6 md:w-7 md:h-7" />
              }

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-6 h-6 md:w-7 md:h-7 rounded-full transition-all duration-200 relative overflow-hidden ${
                    isScanning ? 'ring-2 ring-vaera-ice' : ''
                  }`}
                  style={{
                    backgroundColor: getDensityColor(density, isRevealed || isScanning),
                    boxShadow: isScanning ? '0 0 12px rgba(220, 239, 246, 0.8)' : 'none',
                  }}
                >
                  {/* Pore texture */}
                  {(isRevealed || isScanning) && porePattern[cellIndex]?.map((pore, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-[#d4c4b0]/50"
                      style={{
                        left: `${pore.x}%`,
                        top: `${pore.y}%`,
                        width: `${pore.size}px`,
                        height: `${pore.size}px`,
                      }}
                    />
                  ))}

                  {/* Density reading */}
                  {isRevealed && (
                    <span className="absolute inset-0 flex items-center justify-center text-[7px] md:text-[8px] font-mono text-vaera-navy/70 font-medium">
                      {(density * 100).toFixed(0)}
                    </span>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Scan line glow */}
        {scanLine >= 0 && scanLine < GRID_SIZE && (
          <div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-vaera-ice to-transparent pointer-events-none rounded-full"
            style={{
              top: `${(scanLine / GRID_SIZE) * 100}%`,
              boxShadow: '0 0 20px 4px rgba(220, 239, 246, 0.8)',
            }}
          />
        )}

        {/* Circular border overlay */}
        <div className="absolute inset-0 rounded-full border-2 border-vaera-navy/10 pointer-events-none" style={{ margin: '0.75rem' }} />
      </div>
    </div>
  )
}

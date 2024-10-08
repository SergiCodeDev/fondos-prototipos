import Base64Fondo from './base64-fondo'

export default function Ejemplo() {
  return (
    <Base64Fondo
      width="100%"
      height="calc(100vh - 60px)"
      gridWidth={40}
      gridHeight={64}
      squareColor="rgba(0,0,0,0.2)"
      lineColor="rgba(0,0,0,0.2)"
      squareOpacity={0.2}
      fillPercentage={20}
      lineOpacity={0.2}
      className="h-full flex justify-center items-center"
    >
      {/* Contenido */}
    </Base64Fondo>
  )
}

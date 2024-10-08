import FondoReescalado from './fondo-reescalado'

export default function Ejemplo() {
  return (
    <FondoReescalado
      width="100%"
      height="100vh"
      gridWidth={40}
      gridHeight={64}
      squareColor="rgba(0,0,0,0.2)"
      lineColor="rgba(0,0,0,0.2)"
      squareOpacity={0.2}
      fillPercentage={20}
      lineOpacity={0.2}
      className="h-full flex justify-center items-center"
    >
      {/* <InicioHeader /> // contenido*/}
    </FondoReescalado>
  )
}

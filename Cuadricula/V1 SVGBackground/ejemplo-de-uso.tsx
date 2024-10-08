import SVGBackground from './svg-background'

export default function Ejemplo() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <SVGBackground
        width={1200}
        height={900}
        gridWidth={40}
        gridHeight={64}
        squareColor="rgba(0,0,0,0.2)"
        lineColor="rgba(0,0,0,0.2)"
        squareOpacity={0.2}
        fillPercentage={20}
        lineOpacity={0.2}
      />
      {/* <InicioHeader /> // contenido*/}
    </div>
  )
}

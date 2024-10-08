import FondoPatron from './fondo-con-patron'

export default function Ejemplo() {
  return (
    <FondoPatron
      imagenPatronUrl="/cuadrado-pt.svg"
      className="h-[calc(100vh-60px)] flex justify-center items-center relative"
    >
      {/* <InicioHeader /> */}
      {/* <div className="bg-gradient-to-b from-orange-50 to-transparent w-full h-full absolute top-0 left-0 z-0"></div> // opcional */}
    </FondoPatron>
  )
}

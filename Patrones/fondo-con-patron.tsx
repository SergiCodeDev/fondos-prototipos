import { cn } from '@/lib/utils'
import { CSSProperties } from 'react'

interface FondoPatronProps {
  imagenPatronUrl: string
  className?: string
  children?: React.ReactNode
}

export default function FondoPatron({
  imagenPatronUrl,
  className = '',
  children,
}: FondoPatronProps) {
  return (
    <div
      className={cn(
        `h-full w-full bg-center bg-[image:var(--imagenPatronUrl)]`,
        className
      )}
      style={
        {
          '--imagenPatronUrl': `url(${imagenPatronUrl})`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

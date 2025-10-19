'use client'

import { useEffect, useRef } from 'react'

export function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    const root = document.documentElement
    if (!container || !root) return

    const update = () => {
      const position = positionRef.current
      const target = targetRef.current

      position.x += (target.x - position.x) * 0.12
      position.y += (target.y - position.y) * 0.12

      const valueX = `${position.x}px`
      const valueY = `${position.y}px`

      container.style.setProperty('--grid-x', valueX)
      container.style.setProperty('--grid-y', valueY)
      root.style.setProperty('--grid-x', valueX)
      root.style.setProperty('--grid-y', valueY)

      rafRef.current = requestAnimationFrame(update)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window
      const normalizedX = (event.clientX / innerWidth - 0.5) * 120
      const normalizedY = (event.clientY / innerHeight - 0.5) * 120
      targetRef.current = { x: normalizedX, y: normalizedY }
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update)
      }
    }

    const handlePointerLeave = () => {
      targetRef.current = { x: 0, y: 0 }
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    rafRef.current = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-overlay opacity-30 animate-grid-shift" />
    </div>
  )
}

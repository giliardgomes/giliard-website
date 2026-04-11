import { useEffect } from 'react'
import { useAnimationControls } from 'framer-motion'

export function useEntranceAnimation() {
  const controls = useAnimationControls()

  useEffect(() => {
    let raf: number
    
    raf = requestAnimationFrame(() => {
      controls.set('hidden')
      controls.start('visible')
    })

    return () => cancelAnimationFrame(raf)
  }, [controls])

  return controls
}
export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 920,
  xl: 1200,
  '2xl': 1440,
} as const

export type Breakpoint = keyof typeof breakpoints

// For use in TypeScript/JS (e.g. useMediaQuery, window.matchMedia)
export const mq = {
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  '2xl': `(min-width: ${breakpoints['2xl']}px)`,
} as const
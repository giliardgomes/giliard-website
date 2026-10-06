"use client"

import Image from 'next/image'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import figmaImg from "@/public/images/figma.png";
import antigravity from "@/public/images/antigravity.png";
import reactImg from "@/public/images/react.png";
import claudeImg from "@/public/images/claude.png";
import codexImg from "@/public/images/codex.png";
import githubImg from "@/public/images/github.png";
import a11yImg from "@/public/images/a11y.png";
import sketchImg from "@/public/images/sketch.png";
import vscodeImg from "@/public/images/vs.png";
import styles from "./StackGrid.module.css"

const stackIcons = [
  { src: figmaImg, alt: "Figma" },
  { src: claudeImg, alt: "Claude" },
  { src: vscodeImg, alt: "VS Code" },
  { src: githubImg, alt: "GitHub" },
  { src: a11yImg, alt: "Accessibility" },
  { src: reactImg, alt: "React" },
  { src: sketchImg, alt: "Sketch" },
  { src: codexImg, alt: "Codex" },
  { src: antigravity, alt: "Antigravity" },
]

// Shared by every page showing the grid, so a visitor's order follows them around
const stackOrderKey = "about-stack-order"
const swapTransition = "translate 350ms cubic-bezier(.25, 1, .5, 1)"

// Animate an element's translate to its CSS value, then hand control back to the stylesheet
function settle(el: HTMLElement) {
  el.style.transition = swapTransition
  el.style.translate = ""
  el.addEventListener("transitionend", () => { el.style.transition = "" }, { once: true })
}

const defaultOrder = stackIcons.map((icon) => icon.alt)

function readSavedOrder() {
  try { return localStorage.getItem(stackOrderKey) } catch { return null }
}

function parseOrder(saved: string | null) {
  try {
    const order = JSON.parse(saved ?? "null")
    const valid = Array.isArray(order) && order.length === defaultOrder.length
      && defaultOrder.every((alt) => order.includes(alt))
    return valid ? order as string[] : null
  } catch { return null }
}

function moveItem(list: string[], from: number, to: number) {
  const next = [...list]
  next.splice(to, 0, ...next.splice(from, 1))
  return next
}

// Mini game: drag a tool to a new cell and the others make room. Order is saved per visitor
export default function StackGrid({ className }: { className?: string }) {
  // Saved order is read on the client only (server snapshot is null), avoiding a hydration mismatch
  const saved = useSyncExternalStore(() => () => {}, readSavedOrder, () => null)
  const savedOrder = useMemo(() => parseOrder(saved), [saved])
  const [moved, setMoved] = useState<string[] | null>(null)
  const order = moved ?? savedOrder ?? defaultOrder
  const [dragging, setDragging] = useState<string | null>(null)
  // Cell centers are measured at drag start, so the drop slot doesn't shift as icons move aside
  const drag = useRef<{ alt: string, x: number, y: number, from: number, to: number, slots: { x: number, y: number }[] } | null>(null)
  const grid = useRef<HTMLDivElement>(null)
  const nodes = useRef(new Map<string, HTMLDivElement>())
  const before = useRef(new Map<string, DOMRect>())

  // Mark the grid as visible once it scrolls into view; CSS staggers the tools in
  useEffect(() => {
    const el = grid.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      el.dataset.visible = ""
      observer.disconnect()
    }, { threshold: 0.2 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // FLIP: start moved tools from where they were, then glide into their new cell
  useLayoutEffect(() => {
    before.current.forEach((rect, alt) => {
      const el = nodes.current.get(alt)
      if (!el) return
      const after = el.getBoundingClientRect()
      const dx = rect.left - after.left
      const dy = rect.top - after.top
      if (!dx && !dy) return
      el.style.transition = "none"
      el.style.translate = `${dx}px ${dy}px`
      el.getBoundingClientRect()
      settle(el)
    })
    before.current.clear()
  }, [order])

  // Slide the other tools into the cells they'd take if dropped at `to`
  const preview = (to: number) => {
    const { alt: dragged, from, slots } = drag.current!
    moveItem(order, from, to).forEach((alt, cell) => {
      if (alt === dragged) return
      const el = nodes.current.get(alt)
      if (!el) return
      const home = slots[order.indexOf(alt)]
      const dx = slots[cell].x - home.x
      const dy = slots[cell].y - home.y
      el.style.transition = swapTransition
      el.style.translate = dx || dy ? `${dx}px ${dy}px` : ""
    })
  }

  const onPointerDown = (alt: string) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    e.currentTarget.style.transition = ""
    const slots = order.map((item) => {
      const rect = nodes.current.get(item)!.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    })
    const from = order.indexOf(alt)
    drag.current = { alt, x: e.clientX, y: e.clientY, from, to: from, slots }
    setDragging(alt)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    const { x, y, from, slots } = drag.current
    e.currentTarget.style.translate = `${e.clientX - x}px ${e.clientY - y}px`

    // Nearest cell while over the grid; outside it, everything goes back home
    const bounds = grid.current!.getBoundingClientRect()
    const inside = e.clientX >= bounds.left && e.clientX <= bounds.right && e.clientY >= bounds.top && e.clientY <= bounds.bottom
    const to = inside
      ? slots.reduce((best, slot, i) => Math.hypot(slot.x - e.clientX, slot.y - e.clientY) < Math.hypot(slots[best].x - e.clientX, slots[best].y - e.clientY) ? i : best, 0)
      : from

    if (to === drag.current.to) return
    drag.current.to = to
    preview(to)
  }

  const onPointerUp = () => {
    if (!drag.current) return
    const { from, to } = drag.current
    drag.current = null
    setDragging(null)

    if (to === from) {
      nodes.current.forEach((el) => settle(el))
      return
    }

    // Record where everything is on screen, then let the FLIP effect glide them into the new order
    nodes.current.forEach((el, alt) => {
      before.current.set(alt, el.getBoundingClientRect())
      el.style.translate = ""
    })

    const next = moveItem(order, from, to)
    setMoved(next)
    try { localStorage.setItem(stackOrderKey, JSON.stringify(next)) } catch {}
  }

  return (
    <div className={`${styles.stackGrid} ${className ?? ""}`} ref={grid}>
      {order.map((alt, index) => {
        const icon = stackIcons.find((item) => item.alt === alt)!
        return (
          <div
            className={styles.stackTools}
            key={alt}
            data-tool={alt}
            data-dragging={dragging === alt || undefined}
            style={{ "--i": index } as React.CSSProperties}
            ref={(el) => { if (el) nodes.current.set(alt, el); else nodes.current.delete(alt) }}
            onPointerDown={onPointerDown(alt)}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <Image src={icon.src} alt={icon.alt} className={styles.toolIcon} />
            <span>{icon.alt}</span>
          </div>
        )
      })}
    </div>
  )
}

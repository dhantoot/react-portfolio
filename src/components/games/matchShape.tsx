import * as React from "react"
import {useLayoutEffect, useRef, useState} from "react"

type ShapeRender =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "star"
  | "heart"
  | "pentagon"
  | "hexagon"

type ShapeItem = {
  id: string
  name: string
  render: ShapeRender
  colorHex: string
  className: string
}

const SHAPES: ShapeItem[] = [
  {id: "circle", name: "Circle", render: "circle", colorHex: "#ef4444", className: "bg-red-500"},
  {id: "square", name: "Square", render: "square", colorHex: "#f97316", className: "bg-orange-500"},
  {id: "triangle", name: "Triangle", render: "triangle", colorHex: "#facc15", className: "bg-yellow-400"},
  {id: "diamond", name: "Diamond", render: "diamond", colorHex: "#22c55e", className: "bg-green-500"},
  {id: "star", name: "Star", render: "star", colorHex: "#3b82f6", className: "bg-blue-500"},
  {id: "heart", name: "Heart", render: "heart", colorHex: "#ec4899", className: "bg-pink-500"},
  {id: "pentagon", name: "Pentagon", render: "pentagon", colorHex: "#a855f7", className: "bg-purple-500"},
  {id: "hexagon", name: "Hexagon", render: "hexagon", colorHex: "#14b8a6", className: "bg-teal-500"},
]

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

function Polygon({sides, color, dashed}: { sides: number; color: string; dashed?: boolean }) {
  const points = Array.from({length: sides}, (_, i) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2
    const x = 50 + 40 * Math.cos(angle)
    const y = 50 + 40 * Math.sin(angle)
    return `${x},${y}`
  }).join(" ")

  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <polygon
        points={points}
        fill={dashed ? "none" : color}
        stroke={color}
        strokeWidth="4"
        strokeDasharray={dashed ? "6 6" : "0"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShapeIcon({item}: { item: ShapeItem }) {
  const base = "w-12 h-12"
  switch (item.render) {
    case "circle":
      return <div className={`${base} ${item.className} rounded-full`}/>
    case "square":
      return <div className={`${base} ${item.className} rounded-lg`}/>
    case "triangle":
      return (
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "24px solid transparent",
            borderRight: "24px solid transparent",
            borderBottom: `40px solid ${item.colorHex}`,
          }}
        />
      )
    case "diamond":
      return <div className={`${base} ${item.className} rotate-45`}/>
    case "star":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" style={{color: item.colorHex}}>
          <path
            fill="currentColor"
            d="M12 2l2.9 6 6.6.9-4.8 4.5 1.2 6.6L12 16.9 6.1 20l1.2-6.6L2.5 8.9l6.6-.9L12 2z"
          />
        </svg>
      )
    case "heart":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" style={{color: item.colorHex}}>
          <path
            fill="currentColor"
            d="M12 21s-7.2-4.7-9.2-8.8C1.1 9 2.3 6.1 5.1 5.2c2-.7 4 .1 5.2 1.7 1.2-1.6 3.2-2.4 5.2-1.7 2.8.9 4 3.8 2.3 7-2 4.1-9.2 8.8-9.2 8.8z"
          />
        </svg>
      )
    case "pentagon":
      return <Polygon sides={5} color={item.colorHex}/>
    case "hexagon":
      return <Polygon sides={6} color={item.colorHex}/>
  }
}

function ShapeOutline({item}: { item: ShapeItem }) {
  const base = "w-12 h-12"
  switch (item.render) {
    case "circle":
      return (
        <div
          className={`${base} rounded-full border-4 border-dashed`}
          style={{borderColor: item.colorHex}}
        />
      )
    case "square":
      return (
        <div
          className={`${base} rounded-lg border-4 border-dashed`}
          style={{borderColor: item.colorHex}}
        />
      )
    case "triangle":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <polygon
            points="50,8 92,92 8,92"
            fill="none"
            stroke={item.colorHex}
            strokeWidth="6"
            strokeDasharray="6 6"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "diamond":
      return (
        <div
          className={`${base} rotate-45 border-4 border-dashed`}
          style={{borderColor: item.colorHex}}
        />
      )
    case "star":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" style={{color: item.colorHex}}>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            d="M12 2l2.9 6 6.6.9-4.8 4.5 1.2 6.6L12 16.9 6.1 20l1.2-6.6L2.5 8.9l6.6-.9L12 2z"
          />
        </svg>
      )
    case "heart":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" style={{color: item.colorHex}}>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeDasharray="4 4"
            d="M12 21s-7.2-4.7-9.2-8.8C1.1 9 2.3 6.1 5.1 5.2c2-.7 4 .1 5.2 1.7 1.2-1.6 3.2-2.4 5.2-1.7 2.8.9 4 3.8 2.3 7-2 4.1-9.2 8.8-9.2 8.8z"
          />
        </svg>
      )
    case "pentagon":
      return <Polygon sides={5} color={item.colorHex} dashed/>
    case "hexagon":
      return <Polygon sides={6} color={item.colorHex} dashed/>
  }
}

export default function DragMatchShapes() {
  const playRef = useRef<HTMLDivElement | null>(null)
  const targetRefs = useRef<(HTMLDivElement | never)[]>([])

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [homePositions, setHomePositions] = useState<Record<string, { x: number; y: number }>>({})
  const [placed, setPlaced] = useState<Record<string, boolean>>({})
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null)

  const shapeSize = 64

  useLayoutEffect(() => {
    const el = playRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const cols = 4
    const gap = 16
    const startY = rect.height - 170
    const startX = gap
    const cellW = (rect.width - gap * (cols + 1)) / cols

    const nextPositions: Record<string, { x: number; y: number }> = {}
    SHAPES.forEach((s, i) => {
      const row = Math.floor(i / cols)
      const col = i % cols
      const x = startX + col * (cellW + gap) + (cellW - shapeSize) / 2
      const y = startY + row * (shapeSize + gap)
      nextPositions[s.id] = {x, y}
    })

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPositions(nextPositions)
    setHomePositions(nextPositions)
  }, [])

  function onPointerDown(e: React.PointerEvent, id: string) {
    if (placed[id]) return
    const el = playRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pos = positions[id]
    if (!pos) return

    dragRef.current = {
      id,
      offsetX: e.clientX - rect.left - pos.x,
      offsetY: e.clientY - rect.top - pos.y,
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return
    const el = playRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const {id, offsetX, offsetY} = dragRef.current
    const x = e.clientX - rect.left - offsetX
    const y = e.clientY - rect.top - offsetY

    setPositions((prev) => ({...prev, [id]: {x, y}}))
  }

  function onPointerUp(e: React.PointerEvent) {
    console.log(e)
    const el = playRef.current
    if (!el || !dragRef.current) return

    const {id} = dragRef.current
    dragRef.current = null

    const pos = positions[id]
    if (!pos) return

    const containerRect = el.getBoundingClientRect()
    const centerX = containerRect.left + pos.x + shapeSize / 2
    const centerY = containerRect.top + pos.y + shapeSize / 2

    const shape = SHAPES.find((s) => s.id === id)
    if (!shape) return

    const targetIndex = SHAPES.findIndex((s) => s.id === shape.id)
    const targetEl = targetRefs.current[targetIndex]
    const targetRect = targetEl?.getBoundingClientRect()
    if (!targetRect) return

    const inside =
      centerX >= targetRect.left &&
      centerX <= targetRect.right &&
      centerY >= targetRect.top &&
      centerY <= targetRect.bottom

    if (inside) {
      const snapX = targetRect.left - containerRect.left + (targetRect.width - shapeSize) / 2
      const snapY = targetRect.top - containerRect.top + (targetRect.height - shapeSize) / 2

      setPositions((prev) => ({...prev, [id]: {x: snapX, y: snapY}}))
      setPlaced((prev) => ({...prev, [id]: true}))
      speak("Correct.        !")
    } else {
      setPositions((prev) => ({...prev, [id]: homePositions[id]}))
      speak("Try again!.")
    }
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Match the Shapes</h1>
        <p className="mt-1 text-sm text-slate-600">
          Drag each shape to its dotted outline.
        </p>

        <div
          ref={playRef}
          className="relative mt-4 h-[520px] rounded-2xl border bg-white p-4 shadow-sm"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="grid grid-cols-4 gap-4">
            {SHAPES.map((s, i) => (
              <div
                key={s.id}
                ref={(el: never) => (targetRefs.current[i] = el)}
                className="flex h-16 items-center justify-center rounded-xl border border-dashed border-slate-200"
              >
                <ShapeOutline item={s}/>
              </div>
            ))}
          </div>

          {SHAPES.map((s) => {
            const pos = positions[s.id]
            if (!pos) return null

            return (
              <div
                key={s.id}
                className="absolute touch-none"
                style={{left: pos.x, top: pos.y, width: shapeSize, height: shapeSize}}
                onPointerDown={(e) => onPointerDown(e, s.id)}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <ShapeIcon item={s}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
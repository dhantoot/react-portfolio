import {useLayoutEffect, useRef, useState} from "react"

type ShapeRender =
  | "circle"
  | "square"
  | "triangle"
  | "pentagon"
  | "hexagon"
  | "heptagon"
  | "octagon"

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
  {id: "pentagon", name: "Pentagon", render: "pentagon", colorHex: "#22c55e", className: "bg-green-500"},
  {id: "hexagon", name: "Hexagon", render: "hexagon", colorHex: "#06b6d4", className: "bg-cyan-500"},
  {id: "heptagon", name: "Heptagon", render: "heptagon", colorHex: "#3b82f6", className: "bg-blue-500"},
  {id: "octagon", name: "Octagon", render: "octagon", colorHex: "#a855f7", className: "bg-purple-500"},
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
    <svg viewBox="0 0 100 100" className="w-9 h-9">
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
  const base = "w-9 h-9"
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
            borderLeft: "18px solid transparent",
            borderRight: "18px solid transparent",
            borderBottom: `30px solid ${item.colorHex}`,
          }}
        />
      )
    case "pentagon":
      return <Polygon sides={5} color={item.colorHex}/>
    case "hexagon":
      return <Polygon sides={6} color={item.colorHex}/>
    case "heptagon":
      return <Polygon sides={7} color={item.colorHex}/>
    case "octagon":
      return <Polygon sides={8} color={item.colorHex}/>
  }
}

function ShapeHole({item}: { item: ShapeItem }) {
  const base = "w-9 h-9"
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
    case "pentagon":
      return <Polygon sides={5} color={item.colorHex} dashed/>
    case "hexagon":
      return <Polygon sides={6} color={item.colorHex} dashed/>
    case "heptagon":
      return <Polygon sides={7} color={item.colorHex} dashed/>
    case "octagon":
      return <Polygon sides={8} color={item.colorHex} dashed/>
  }
}

export default function ShapeDropbox() {
  const playRef = useRef<HTMLDivElement | null>(null)
  const holeRefs = useRef<(HTMLDivElement | null)[]>([])

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [homePositions, setHomePositions] = useState<Record<string, { x: number; y: number }>>({})
  const [placed, setPlaced] = useState<Record<string, boolean>>({})
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null)

  const shapeSize = 48

  useLayoutEffect(() => {
    const el = playRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const cols = 2
    const gap = 24
    const startY = rect.height - 160
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

  function onPointerUp() {
    const el = playRef.current
    if (!el || !dragRef.current) return

    const {id} = dragRef.current
    dragRef.current = null

    const pos = positions[id]
    if (!pos) return

    const containerRect = el.getBoundingClientRect()
    const centerX = containerRect.left + pos.x + shapeSize / 2
    const centerY = containerRect.top + pos.y + shapeSize / 2

    const targetIndex = SHAPES.findIndex((s) => s.id === id)
    const holeEl = holeRefs.current[targetIndex]
    const holeRect = holeEl?.getBoundingClientRect()
    if (!holeRect) return

    const inside =
      centerX >= holeRect.left &&
      centerX <= holeRect.right &&
      centerY >= holeRect.top &&
      centerY <= holeRect.bottom

    if (inside) {
      const snapX = holeRect.left - containerRect.left + (holeRect.width - shapeSize) / 2
      const snapY = holeRect.top - containerRect.top + (holeRect.height - shapeSize) / 2

      setPositions((prev) => ({...prev, [id]: {x: snapX, y: snapY}}))
      setPlaced((prev) => ({...prev, [id]: true}))
      speak("Correct.        !")
    } else {
      setPositions((prev) => ({...prev, [id]: homePositions[id]}))
      speak("Try again")
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-amber-50 p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Shape Dropbox</h1>
        <p className="mt-1 text-sm text-slate-600">Drag each shape into its hole.</p>

        <div
          ref={playRef}
          className="relative mt-4 h-[520px] rounded-2xl border bg-white p-4 shadow-sm"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="debug grid grid-cols-3 gap-3">
            {SHAPES.map((s, i) => (
              <div
                key={s.id}
                ref={(el: never) => (holeRefs.current[i] = el)}
                className="flex h-20 items-center justify-center rounded-xl border border-dashed border-slate-200"
              >
                <ShapeHole item={s}/>
              </div>
            ))}
          </div>

          <div className={'debug'}>
            {SHAPES.map((s) => {
              const pos = positions[s.id]
              if (!pos) return null

              return (
                <div
                  key={s.id}
                  className="debug absolute touch-none"
                  style={{left: pos.x, top: pos.y, width: shapeSize, height: shapeSize}}
                  onPointerDown={(e) => onPointerDown(e, s.id)}
                >
                  <div className="debug flex h-full w-full items-center justify-center">
                    <ShapeIcon item={s}/>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
import {useLayoutEffect, useMemo, useRef, useState} from "react"

type ShapeRender =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "star"
  | "heart"
  | "pentagon"
  | "hexagon"

type ColorItem = { name: string; className: string; hex: string }

type ShapeItem = {
  id: string
  name: string
  render: ShapeRender
  color: ColorItem
}

const COLORS: ColorItem[] = [
  {name: "Red", className: "bg-red-400", hex: "#f87171"},
  {name: "Orange", className: "bg-orange-400", hex: "#fb923c"},
  {name: "Yellow", className: "bg-yellow-300", hex: "#fde047"},
  {name: "Green", className: "bg-green-400", hex: "#4ade80"},
  {name: "Blue", className: "bg-blue-400", hex: "#60a5fa"},
  {name: "Purple", className: "bg-purple-400", hex: "#c084fc"},
  {name: "Pink", className: "bg-pink-400", hex: "#f472b6"},
  {name: "Teal", className: "bg-teal-400", hex: "#2dd4bf"},
]

const SHAPES: ShapeItem[] = [
  {id: "red-circle", name: "Circle", render: "circle", color: COLORS[0]},
  {id: "orange-square", name: "Square", render: "square", color: COLORS[1]},
  {id: "yellow-triangle", name: "Triangle", render: "triangle", color: COLORS[2]},
  {id: "green-diamond", name: "Diamond", render: "diamond", color: COLORS[3]},
  {id: "blue-star", name: "Star", render: "star", color: COLORS[4]},
  {id: "purple-heart", name: "Heart", render: "heart", color: COLORS[5]},
  {id: "pink-pentagon", name: "Pentagon", render: "pentagon", color: COLORS[6]},
  {id: "teal-hexagon", name: "Hexagon", render: "hexagon", color: COLORS[7]},
]

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

function Polygon({sides, color}: { sides: number; color: string }) {
  const points = Array.from({length: sides}, (_, i) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2
    const x = 50 + 40 * Math.cos(angle)
    const y = 50 + 40 * Math.sin(angle)
    return `${x},${y}`
  }).join(" ")

  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10">
      <polygon points={points} fill={color}/>
    </svg>
  )
}

function ShapeIcon({item}: { item: ShapeItem }) {
  const base = "w-10 h-10"
  switch (item.render) {
    case "circle":
      return <div className={`${base} ${item.color.className} rounded-full`}/>
    case "square":
      return <div className={`${base} ${item.color.className} rounded-lg`}/>
    case "triangle":
      return (
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderBottom: `34px solid ${item.color.hex}`,
          }}
        />
      )
    case "diamond":
      return <div className={`${base} ${item.color.className} rotate-45`}/>
    case "star":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10" style={{color: item.color.hex}}>
          <path
            fill="currentColor"
            d="M12 2l2.9 6 6.6.9-4.8 4.5 1.2 6.6L12 16.9 6.1 20l1.2-6.6L2.5 8.9l6.6-.9L12 2z"
          />
        </svg>
      )
    case "heart":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10" style={{color: item.color.hex}}>
          <path
            fill="currentColor"
            d="M12 21s-7.2-4.7-9.2-8.8C1.1 9 2.3 6.1 5.1 5.2c2-.7 4 .1 5.2 1.7 1.2-1.6 3.2-2.4 5.2-1.7 2.8.9 4 3.8 2.3 7-2 4.1-9.2 8.8-9.2 8.8z"
          />
        </svg>
      )
    case "pentagon":
      return <Polygon sides={5} color={item.color.hex}/>
    case "hexagon":
      return <Polygon sides={6} color={item.color.hex}/>
  }
}

export default function DragMatchColors() {
  const playRef = useRef<HTMLDivElement | never>(null)
  const boxRefs = useRef<(HTMLDivElement | never)[]>([])

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [homePositions, setHomePositions] = useState<Record<string, { x: number; y: number }>>({})
  const [placed, setPlaced] = useState<Record<string, boolean>>({})

  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null)
  const shapeSize = 56

  const didInit = useRef(false)

  useLayoutEffect(() => {
    if (didInit.current) return
    didInit.current = true

    const el = playRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const cols = 4
    const gap = 16
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPositions(nextPositions)
    setHomePositions(nextPositions)
  }, [])

  const boxes = useMemo(() => COLORS, [])

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

    const shape = SHAPES.find((s) => s.id === id)
    if (!shape) return

    const targetIndex = COLORS.findIndex((c) => c.name === shape.color.name)
    const boxEl = boxRefs.current[targetIndex]
    const boxRect = boxEl?.getBoundingClientRect()
    if (!boxRect) return

    const inside =
      centerX >= boxRect.left &&
      centerX <= boxRect.right &&
      centerY >= boxRect.top &&
      centerY <= boxRect.bottom

    if (inside) {
      const snapX = boxRect.left - containerRect.left + (boxRect.width - shapeSize) / 2
      const snapY = boxRect.top - containerRect.top + (boxRect.height - shapeSize) / 2

      setPositions((prev) => ({...prev, [id]: {x: snapX, y: snapY}}))
      setPlaced((prev) => ({...prev, [id]: true}))
      speak("Correct.        !")
    } else {
      setPositions((prev) => ({...prev, [id]: homePositions[id]}))
      speak("Try again")
    }
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Match the Colors</h1>
        <p className="mt-1 text-sm text-slate-600">
          Drag each shape to the matching color box.
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
            {boxes.map((c, i) => (
              <div
                key={c.name}
                ref={(el: never) => (boxRefs.current[i] = el)}
                className={`h-16 rounded-xl ${c.className} opacity-70`}
              />
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
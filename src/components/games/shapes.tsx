import {useState, memo} from "react";

type ShapeItem = {
  name: string
  className: string
  hex: string
  render:
    | "circle"
    | "square"
    | "triangle"
    | "diamond"
    | "star"
    | "heart"
    | "pentagon"
    | "hexagon"
    | "heptagon"
    | "octagon"
    | "nonagon"
    | "decagon"
}

const SHAPES: ShapeItem[] = [
  {name: "Circle", className: "bg-red-500", hex: "#ef4444", render: "circle"},
  {name: "Square", className: "bg-orange-500", hex: "#f97316", render: "square"},
  {name: "Triangle", className: "bg-yellow-400", hex: "#facc15", render: "triangle"},
  {name: "Diamond", className: "bg-green-500", hex: "#22c55e", render: "diamond"},
  {name: "Star", className: "bg-blue-500", hex: "#3b82f6", render: "star"},
  {name: "Heart", className: "bg-pink-500", hex: "#ec4899", render: "heart"},

  {name: "Circle", className: "bg-purple-500", hex: "#a855f7", render: "circle"},
  {name: "Square", className: "bg-teal-500", hex: "#14b8a6", render: "square"},
  {name: "Triangle", className: "bg-amber-500", hex: "#f59e0b", render: "triangle"},
  {name: "Diamond", className: "bg-indigo-500", hex: "#6366f1", render: "diamond"},
  {name: "Star", className: "bg-rose-500", hex: "#f43f5e", render: "star"},
  {name: "Heart", className: "bg-fuchsia-500", hex: "#d946ef", render: "heart"},

  {name: "Circle", className: "bg-lime-500", hex: "#84cc16", render: "circle"},
  {name: "Square", className: "bg-cyan-500", hex: "#06b6d4", render: "square"},
  {name: "Triangle", className: "bg-emerald-500", hex: "#10b981", render: "triangle"},
  {name: "Diamond", className: "bg-sky-500", hex: "#0ea5e9", render: "diamond"},
  {name: "Star", className: "bg-violet-500", hex: "#8b5cf6", render: "star"},
  {name: "Heart", className: "bg-slate-600", hex: "#475569", render: "heart"},

  {name: "Pentagon", className: "bg-purple-500", hex: "#a855f7", render: "pentagon"},
  {name: "Hexagon", className: "bg-teal-500", hex: "#14b8a6", render: "hexagon"},
  {name: "Heptagon", className: "bg-amber-500", hex: "#f59e0b", render: "heptagon"},
  {name: "Octagon", className: "bg-indigo-500", hex: "#6366f1", render: "octagon"},
  {name: "Nonagon", className: "bg-rose-500", hex: "#f43f5e", render: "nonagon"},
  {name: "Decagon", className: "bg-emerald-500", hex: "#10b981", render: "decagon"},
]

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

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

function ShapeIcon({item}: { item: ShapeItem }) {
  const base = "w-10 h-10"
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
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderBottom: `34px solid ${item.hex}`,
          }}
        />
      )
    case "diamond":
      return <div className={`${base} ${item.className} rotate-45`}/>
    case "star":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10" style={{color: item.hex}}>
          <path
            fill="currentColor"
            d="M12 2l2.9 6 6.6.9-4.8 4.5 1.2 6.6L12 16.9 6.1 20l1.2-6.6L2.5 8.9l6.6-.9L12 2z"
          />
        </svg>
      )
    case "heart":
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10" style={{color: item.hex}}>
          <path
            fill="currentColor"
            d="M12 21s-7.2-4.7-9.2-8.8C1.1 9 2.3 6.1 5.1 5.2c2-.7 4 .1 5.2 1.7 1.2-1.6 3.2-2.4 5.2-1.7 2.8.9 4 3.8 2.3 7-2 4.1-9.2 8.8-9.2 8.8z"
          />
        </svg>
      )
    case "pentagon":
      return <Polygon sides={5} color={item.hex}/>
    case "hexagon":
      return <Polygon sides={6} color={item.hex}/>
    case "heptagon":
      return <Polygon sides={7} color={item.hex}/>
    case "octagon":
      return <Polygon sides={8} color={item.hex}/>
    case "nonagon":
      return <Polygon sides={9} color={item.hex}/>
    case "decagon":
      return <Polygon sides={10} color={item.hex}/>
  }
}

function ShapesTapSpeak() {
  const [active, setActive] = useState(0)

  function onPick(index: number) {
    setActive(index)
    speak(SHAPES[index].name)
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Shapes</h1>
        <p className="mt-1 text-sm text-slate-600">Tap a shape.</p>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {SHAPES.map((s, i) => (
              <button
                key={`${s.name}-${i}`}
                onClick={() => onPick(i)}
                className={`aspect-square rounded-xl border bg-white shadow-sm transition active:scale-95 flex items-center justify-center ${
                  active === i ? "ring-4 ring-amber-200" : ""
                }`}
                aria-label={s.name}
              >
                <ShapeIcon item={s}/>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm text-center">
          <div className="text-lg font-semibold text-slate-700">
            {SHAPES[active].name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ShapesTapSpeak)
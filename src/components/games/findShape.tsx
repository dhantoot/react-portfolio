import {useEffect, useMemo, useState} from "react"

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
  {name: "Pentagon", className: "bg-purple-500", hex: "#a855f7", render: "pentagon"},
  {name: "Hexagon", className: "bg-teal-500", hex: "#14b8a6", render: "hexagon"},
  {name: "Heptagon", className: "bg-amber-500", hex: "#f59e0b", render: "heptagon"},
  {name: "Octagon", className: "bg-indigo-500", hex: "#6366f1", render: "octagon"},
  {name: "Nonagon", className: "bg-rose-500", hex: "#f43f5e", render: "nonagon"},
  {name: "Decagon", className: "bg-emerald-500", hex: "#10b981", render: "decagon"},
]

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

function beep(freq = 440, duration = 0.12, gain = 0.25) {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.connect(g)
  g.connect(ctx.destination)
  o.frequency.value = freq
  g.gain.value = gain
  o.start()
  o.stop(ctx.currentTime + duration)
}

function pickRandom(arr: ShapeItem[]) {
  return arr[Math.floor(Math.random() * arr.length)]
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

export default function FindTheShape() {
  const allShapes = useMemo(() => SHAPES, [])
  const [target, setTarget] = useState<ShapeItem>(() => pickRandom(allShapes))
  const [message, setMessage] = useState("Tap the shape I say!")

  useEffect(() => {
    speak(`Find ${target.name}`)
  }, [target])

  function nextTarget() {
    const next = pickRandom(allShapes)
    setTarget(next)
    setMessage("Tap the shape I say!")
  }

  function onPick(item: ShapeItem) {
    if (item.name === target.name) {
      setMessage("Great job!")
      beep(700, 0.12, 0.3)
      speak("Correct.        !")
      setTimeout(() => nextTarget(), 600)
    } else {
      setMessage("Try again")
      beep(240, 0.1, 0.25)
      speak(`Try again!`)
    }
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Find the Shape</h1>
        <p className="mt-1 text-sm text-slate-600">
          I will say a shape. Tap it!
        </p>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="text-center text-lg font-semibold text-slate-700">
            {message}
          </div>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-sm text-slate-600">Target:</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
              {target.name}
            </span>
          </div>

          <button
            onClick={() => speak(`Find ${target.name}`)}
            className="mt-3 w-full rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
          >
            Repeat
          </button>
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {allShapes.map((s, i) => (
              <button
                key={`${s.name}-${i}`}
                onClick={() => onPick(s)}
                className="aspect-square rounded-xl border bg-white shadow-sm transition active:scale-95 flex items-center justify-center"
                aria-label={s.name}
              >
                <ShapeIcon item={s}/>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
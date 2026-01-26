import {useMemo, useState} from "react"

type Shape = "circle" | "square" | "triangle"
type Color = { name: string; className: string; hex: string }

const COLORS: Color[] = [
  {name: "Red", className: "bg-red-500", hex: "#ef4444"},
  {name: "Green", className: "bg-green-500", hex: "#22c55e"},
  {name: "Blue", className: "bg-blue-500", hex: "#3b82f6"},
  {name: "Yellow", className: "bg-yellow-400", hex: "#facc15"},
]

const SHAPES: Shape[] = ["circle", "square", "triangle"]

function getRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeRound() {
  return {shape: getRandom(SHAPES), color: getRandom(COLORS)}
}

export default function ShapeAndColorMatching() {
  const [round, setRound] = useState(makeRound)
  const [message, setMessage] = useState("Tap the matching shape")
  const [selected, setSelected] = useState<{ shape: Shape; color: Color } | null>(null)
  const [flash, setFlash] = useState<"win" | "oops" | null>(null)

  const options = useMemo(() => {
    // 3 options: 1 correct + 2 random
    const opts = [{shape: round.shape, color: round.color}]
    while (opts.length < 3) {
      const next = makeRound()
      const dup = opts.some(
        (o) => o.shape === next.shape && o.color.name === next.color.name
      )
      if (!dup) opts.push(next)
    }
    return opts.sort(() => Math.random() - 0.5)
  }, [round])

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.9
    utter.pitch = 1.1
    window.speechSynthesis.speak(utter)
  }

  function beep(freq = 440, duration = 0.12) {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.connect(g)
    g.connect(ctx.destination)
    o.frequency.value = freq
    g.gain.value = 0.2
    o.start()
    o.stop(ctx.currentTime + duration)
  }

  function onPick(opt: { shape: Shape; color: Color }) {
    setSelected(opt)
    if (opt.shape === round.shape && opt.color.name === round.color.name) {
      setMessage("Yay! You got it!")
      setFlash("win")
      beep(660, 0.12)
      speak("Correct.        !")
      setTimeout(() => {
        setRound(makeRound())
        setMessage("Tap the matching shape")
        setSelected(null)
        setFlash(null)
      }, 700)
    } else {
      setMessage("Try again!")
      setFlash("oops")
      beep(220, 0.1)
      speak("Try again")
      setTimeout(() => setFlash(null), 300)
    }
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="justify-between mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Shape & Color Match</h1>
        <p className="mt-1 text-sm text-slate-600">Match the big shape!</p>

        <div
          className={`mt-6 rounded-2xl border bg-white p-6 shadow-sm transition ${
            flash === "win" ? "ring-4 ring-green-300" : flash === "oops" ? "ring-4 ring-red-200" : ""
          }`}
        >
          <div className="text-center text-lg font-semibold text-slate-700">{message}</div>

          <div className="mt-6 flex items-center justify-center">
            <ShapeTile shape={round.shape} color={round.color} size="big"/>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onPick(opt)}
              className={`rounded-2xl border bg-white p-3 shadow-sm active:scale-95 transition ${
                selected &&
                selected.shape === opt.shape &&
                selected.color.name === opt.color.name
                  ? "ring-4 ring-blue-200"
                  : ""
              }`}
            >
              <div className="flex items-center justify-center">
                <ShapeTile shape={opt.shape} color={opt.color} size="small"/>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ShapeTile({shape, color, size,}: {
  shape: Shape
  color: Color
  size: "big" | "small"
}) {
  const dim = size === "big" ? 140 : 64
  if (shape === "triangle") {
    const border = size === "big" ? 70 : 32
    return (
      <div
        aria-label={`${color.name} triangle`}
        style={{
          width: 0,
          height: 0,
          borderLeft: `${border}px solid transparent`,
          borderRight: `${border}px solid transparent`,
          borderBottom: `${border * 1.4}px solid ${color.hex}`,
        }}
      />
    )
  }

  return (
    <div
      aria-label={`${color.name} ${shape}`}
      className={`${color.className} ${shape === "circle" ? "rounded-full" : "rounded-lg"}`}
      style={{width: dim, height: dim}}
    />
  )
}
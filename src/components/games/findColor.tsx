import {useEffect, useMemo, useState, memo} from "react"

type ColorItem = {
  name: string
  className: string
  hex: string
  freq: number
}

const COLORS: ColorItem[] = [
  {name: "Red", className: "bg-red-500", hex: "#ef4444", freq: 520},
  {name: "Orange", className: "bg-orange-500", hex: "#f97316", freq: 540},
  {name: "Yellow", className: "bg-yellow-400", hex: "#facc15", freq: 560},
  {name: "Lime", className: "bg-lime-400", hex: "#a3e635", freq: 500},
  {name: "Green", className: "bg-green-500", hex: "#22c55e", freq: 480},
  {name: "Teal", className: "bg-teal-500", hex: "#14b8a6", freq: 460},
  {name: "Cyan", className: "bg-cyan-400", hex: "#22d3ee", freq: 440},
  {name: "Blue", className: "bg-blue-500", hex: "#3b82f6", freq: 420},
  {name: "Indigo", className: "bg-indigo-500", hex: "#6366f1", freq: 400},
  {name: "Purple", className: "bg-purple-500", hex: "#a855f7", freq: 380},
  {name: "Pink", className: "bg-pink-500", hex: "#ec4899", freq: 360},
  {name: "Rose", className: "bg-rose-500", hex: "#f43f5e", freq: 340},
  {name: "Brown", className: "bg-amber-700", hex: "#b45309", freq: 320},
  {name: "Gray", className: "bg-gray-400", hex: "#9ca3af", freq: 300},
  {name: "Black", className: "bg-slate-900", hex: "#0f172a", freq: 280},
  {name: "White", className: "bg-white", hex: "#ffffff", freq: 260},
  {name: "Beige", className: "bg-yellow-200", hex: "#fef08a", freq: 240},
  {name: "Peach", className: "bg-orange-200", hex: "#fed7aa", freq: 220},
  {name: "Mint", className: "bg-emerald-200", hex: "#a7f3d0", freq: 200},
  {name: "Lavender", className: "bg-violet-200", hex: "#ddd6fe", freq: 180},
]

// function beep(freq = 440, duration = 0.12, gain = 0.25) {
//   const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
//   const o = ctx.createOscillator()
//   const g = ctx.createGain()
//   o.connect(g)
//   g.connect(ctx.destination)
//   o.frequency.value = freq
//   g.gain.value = gain
//   o.start()
//   o.stop(ctx.currentTime + duration)
// }

function pickRandom(arr: ColorItem[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function FindTheColor() {
  const allColors = useMemo(() => COLORS, [])
  const [target, setTarget] = useState<ColorItem>(() => pickRandom(allColors))
  const [message, setMessage] = useState("Tap the color I say!")
  const [audioReady, setAudioReady] = useState(false)

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.9
    utter.pitch = 1.1
    window.speechSynthesis.speak(utter)
  }

  // useEffect(() => {
  //   speak(`Find ${target.name}`)
  // }, [target])

  function startAudio() {
    setAudioReady(true)
    speak(`Find ${target.name}`)
  }

  function nextTarget() {
    const next = pickRandom(allColors)
    setTarget(next)
    setMessage("Tap the color I say!")
  }

  function onPick(c: ColorItem) {
    if (c.name === target.name) {
      setMessage("Great job!")
      // beep(700, 0.12, 0.3)
      // speak("Great Job!.")
      speak("Correct!.")
      setTimeout(() => nextTarget(), 600)
    } else {
      setMessage("Try again")
      // beep(240, 0.1, 0.25)
      speak(`Try again!`)
    }
  }

  useEffect(() => {
    if (!audioReady) return
    speak(`Find ${target.name}`)
  }, [target, audioReady])

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Find the Color</h1>
        <p className="mt-1 text-sm text-slate-600">
          I will say a color. Tap it!
        </p>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="text-center text-lg font-semibold text-slate-700">
            {message}
          </div>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-sm text-slate-600">Target:</span>
            <span className="rounded-full px-3 py-1 text-sm font-semibold"
                  style={{backgroundColor: target.hex}}
            >
              {target.name}
            </span>
          </div>

          {!audioReady ? (
            <button
              onClick={startAudio}
              className="mt-3 w-full rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => speak(`Find ${target.name}`)}
              className="mt-3 w-full rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
            >
              Repeat
            </button>
          )}
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {allColors.map((c) => (
              <button
                key={c.name}
                onClick={() => onPick(c)}
                className={`aspect-square rounded-xl border shadow-sm transition active:scale-95 ${c.className}`}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(FindTheColor)
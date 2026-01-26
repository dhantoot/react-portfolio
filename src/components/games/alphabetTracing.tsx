import {useEffect, useMemo, useRef, useState} from "react"

type Letter =
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J"
  | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T"
  | "U" | "V" | "W" | "X" | "Y" | "Z"

const LETTER_POINTS: Record<Letter, [number, number][]> = {
  A: [
    [15, 90], [25, 70], [35, 50], [45, 30], [50, 15],
    [55, 30], [65, 50], [75, 70], [85, 90],
    [30, 60], [50, 60], [70, 60],
  ],
  B: [
    [20, 10], [20, 30], [20, 50], [20, 70], [20, 90],
    [40, 20], [55, 30], [55, 45], [40, 50],
    [40, 60], [55, 70], [55, 85], [40, 90],
  ],
  C: [
    [80, 20], [65, 15], [50, 15], [35, 20],
    [25, 35], [20, 50], [25, 65], [35, 80],
    [50, 85], [65, 85], [80, 80],
  ],
  D: [
    [20, 10], [20, 30], [20, 50], [20, 70], [20, 90],
    [40, 20], [60, 35], [65, 50], [60, 65], [40, 80],
  ],
  E: [
    [20, 10], [20, 30], [20, 50], [20, 70], [20, 90],
    [40, 10], [60, 10],
    [40, 50], [60, 50],
    [40, 90], [60, 90],
  ],
  F: [
    [20, 10], [20, 30], [20, 50], [20, 70], [20, 90],
    [40, 10], [60, 10],
    [40, 50], [60, 50],
  ],
  G: [
    [80, 20], [65, 15], [50, 15], [35, 20],
    [25, 35], [20, 50], [25, 65], [35, 80],
    [50, 85], [65, 85], [80, 75],
    [60, 60], [75, 60],
  ],
  H: [
    [20, 10], [20, 30], [20, 50], [20, 70], [20, 90],
    [80, 10], [80, 30], [80, 50], [80, 70], [80, 90],
    [30, 50], [50, 50], [70, 50],
  ],
  I: [
    [20, 10], [50, 10], [80, 10],
    [50, 30], [50, 50], [50, 70],
    [20, 90], [50, 90], [80, 90],
  ],
  J: [
    [20, 10], [50, 10], [80, 10],
    [60, 30], [60, 50], [60, 70],
    [55, 85], [40, 90], [25, 80],
  ],
  K: [
    [20, 10], [20, 30], [20, 50], [20, 70], [20, 90],
    [60, 10], [40, 40], [70, 50], [40, 60], [60, 90],
  ],
  L: [
    [20, 10], [20, 30], [20, 50], [20, 70], [20, 90],
    [40, 90], [60, 90], [80, 90],
  ],
  M: [
    [20, 90], [20, 70], [20, 50], [20, 30], [20, 10],
    [50, 40], [80, 10], [80, 30], [80, 50], [80, 70], [80, 90],
    [50, 60],
  ],
  N: [
    [20, 90], [20, 70], [20, 50], [20, 30], [20, 10],
    [40, 30], [60, 50], [80, 70], [80, 90],
    [80, 70], [80, 50], [80, 30], [80, 10],
  ],
  O: [
    [50, 10], [65, 15], [80, 30], [85, 50], [80, 70], [65, 85],
    [50, 90], [35, 85], [20, 70], [15, 50], [20, 30], [35, 15],
  ],
  P: [
    [20, 90], [20, 70], [20, 50], [20, 30], [20, 10],
    [40, 10], [60, 15], [70, 30], [60, 45], [40, 50],
  ],
  Q: [
    [50, 10], [65, 15], [80, 30], [85, 50], [80, 70], [65, 85],
    [50, 90], [35, 85], [20, 70], [15, 50], [20, 30], [35, 15],
    [60, 70], [75, 90],
  ],
  R: [
    [20, 90], [20, 70], [20, 50], [20, 30], [20, 10],
    [40, 10], [60, 15], [70, 30], [60, 45], [40, 50],
    [50, 60], [70, 90],
  ],
  S: [
    [80, 20], [65, 15], [50, 15], [35, 20], [25, 35],
    [35, 50], [50, 50], [65, 50], [75, 65],
    [65, 80], [50, 85], [35, 80], [25, 65],
  ],
  T: [
    [20, 10], [50, 10], [80, 10],
    [50, 30], [50, 50], [50, 70], [50, 90],
  ],
  U: [
    [20, 10], [20, 30], [20, 50], [20, 70], [25, 85],
    [40, 90], [60, 90], [75, 85],
    [80, 70], [80, 50], [80, 30], [80, 10],
  ],
  V: [
    [20, 10], [30, 30], [40, 50], [50, 70], [60, 50], [70, 30], [80, 10],
    [50, 90],
  ],
  W: [
    [20, 10], [30, 30], [40, 50], [50, 70], [60, 50], [70, 30], [80, 10],
    [70, 40], [60, 60], [50, 80], [40, 60], [30, 40],
  ],
  X: [
    [20, 10], [35, 30], [50, 50], [65, 70], [80, 90],
    [80, 10], [65, 30], [50, 50], [35, 70], [20, 90],
  ],
  Y: [
    [20, 10], [35, 30], [50, 50], [65, 30], [80, 10],
    [50, 50], [50, 70], [50, 90],
  ],
  Z: [
    [20, 10], [40, 10], [60, 10], [80, 10],
    [65, 30], [50, 50], [35, 70], [20, 90],
    [40, 90], [60, 90], [80, 90],
  ],
}

const LETTERS: Letter[] = Array.from(
  {length: 26},
  (_, i) => String.fromCharCode(65 + i) as Letter
)

function beep(freq = 520, duration = 0.06, gain = 0.2) {
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

export default function AlphabetTracing() {
  const [letterIndex, setLetterIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [trace, setTrace] = useState<[number, number][]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const letter = LETTERS[letterIndex]
  const points = useMemo(() => LETTER_POINTS[letter], [letter])

  useEffect(() => {
    setProgress(0)
    setTrace([])
  }, [letter])

  function resetRound(nextIndex = letterIndex) {
    setLetterIndex(nextIndex)
    setProgress(0)
    setTrace([])
  }

  function nextLetter() {
    const next = (letterIndex + 1) % LETTERS.length
    resetRound(next)
  }

  function toSvgPoint(e: React.PointerEvent, svg: SVGSVGElement) {
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    return [x, y] as [number, number]
  }

  function handlePointerDown(e: React.PointerEvent) {
    const svg = svgRef.current
    if (!svg) return
    svg.setPointerCapture(e.pointerId)
    setIsDrawing(true)
    const pt = toSvgPoint(e, svg)
    setTrace([pt])
    handlePointerMove(e)
  }

  function handlePointerUp(e: React.PointerEvent) {
    const svg = svgRef.current
    if (!svg) return
    svg.releasePointerCapture(e.pointerId)
    setIsDrawing(false)
    setTrace([]) // stop connecting to next stroke
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDrawing) return
    const svg = svgRef.current
    if (!svg) return

    const [x, y] = toSvgPoint(e, svg)
    setTrace((t) => [...t, [x, y]])

    const target = points[progress]
    if (!target) return

    const dx = x - target[0]
    const dy = y - target[1]
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < 7) {
      beep(620, 0.05, 0.25)
      setProgress((p) => Math.min(p + 1, points.length))
      if (progress + 1 === points.length) {
        beep(780, 0.12, 0.3)
      }
    }
  }

  const done = progress >= points.length

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Alphabet Tracing</h1>
          <button
            onClick={nextLetter}
            className="rounded-full bg-white px-3 py-1 text-xs font-semibold shadow"
          >
            Next
          </button>
        </div>

        <p className="mt-1 text-sm text-slate-600">
          Trace the dots in order.
        </p>

        <div className="mt-6 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="text-center text-lg font-semibold text-slate-700">
            Letter: {letter}
          </div>

          <div className="mt-4 aspect-square w-full touch-none">
            <svg
              ref={svgRef}
              viewBox="0 0 100 100"
              className="h-full w-full"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* guide letter */}
              <text
                x="92"
                y="18"
                textAnchor="end"
                fontSize="18"
                fontFamily="sans-serif"
                fill="#e2e8f0"
              >
                {letter}
              </text>

              {/* dots */}
              {points.map(([x, y], i) => {
                const active = i < progress
                const isNext = i === progress
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={isNext ? 4.5 : 3.5}
                    fill={active ? "#22c55e" : "#94a3b8"}
                  />
                )
              })}

              {/* completed path */}
              {progress > 1 && (
                <polyline
                  points={points.slice(0, progress).map(([x, y]) => `${x},${y}`).join(" ")}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* live trace */}
              {trace.length > 1 && (
                <polyline
                  points={trace.map(([x, y]) => `${x},${y}`).join(" ")}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
              )}


            </svg>
          </div>

          {done && (
            <div className="mt-3 rounded-xl bg-green-50 p-2 text-center text-sm font-semibold text-green-700">
              Great job!
            </div>
          )}

          <button
            onClick={() => resetRound()}
            className="mt-3 w-full rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
          >
            Trace Again
          </button>
        </div>
      </div>
    </div>
  )
}
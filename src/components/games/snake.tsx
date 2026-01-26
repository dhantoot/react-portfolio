import {useCallback, useEffect, useMemo, useState} from "react"
import {ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp, FastForward, Pause, Play, RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

type Point = { x: number; y: number }

const GRID_W = 20
const GRID_H = 30

const START: Point[] = [
  {x: 10, y: 15},
  {x: 9, y: 15},
  {x: 8, y: 15},
]

function randFood(snake: Point[]) {
  let p: Point
  do {
    p = {
      x: Math.floor(Math.random() * GRID_W),
      y: Math.floor(Math.random() * GRID_H),
    }
  } while (snake.some((s) => s.x === p.x && s.y === p.y))
  return p
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(START)
  const [dir, setDir] = useState<Point>({x: 1, y: 0})
  const [food, setFood] = useState<Point>(() => randFood(START))
  const [running, setRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const speed = useMemo(
    () => Math.max(60, 220 - Math.floor(score / 5) * 20),
    [score]
  )

  const step = useCallback(() => {
    setSnake((prev) => {
      const head = prev[0]
      const next = {x: head.x + dir.x, y: head.y + dir.y}

      if (next.x < 0 || next.y < 0 || next.x >= GRID_W || next.y >= GRID_H) {
        setGameOver(true)
        setRunning(false)
        return prev
      }
      if (prev.some((s) => s.x === next.x && s.y === next.y)) {
        setGameOver(true)
        setRunning(false)
        return prev
      }

      const ate = next.x === food.x && next.y === food.y
      const newSnake = [next, ...prev]
      if (!ate) newSnake.pop()
      else {
        setScore((s) => s + 1)
        setFood(randFood(newSnake))
      }
      return newSnake
    })
  }, [dir, food])

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.9
    utter.pitch = 1.1
    window.speechSynthesis.speak(utter)
  }

  useEffect(() => {
    if (gameOver) speak("Game over!")
  }, [gameOver])

  useEffect(() => {
    if (!running || gameOver) return
    const id = setInterval(step, speed)
    return () => clearInterval(id)
  }, [running, gameOver, speed, step])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!running) return
      if (e.key === "ArrowUp" && dir.y !== 1) setDir({x: 0, y: -1})
      if (e.key === "ArrowDown" && dir.y !== -1) setDir({x: 0, y: 1})
      if (e.key === "ArrowLeft" && dir.x !== 1) setDir({x: -1, y: 0})
      if (e.key === "ArrowRight" && dir.x !== -1) setDir({x: 1, y: 0})
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [running, dir])

  function start() {
    if (gameOver) reset()
    setRunning(true)
  }

  function pause() {
    setRunning(false)
  }

  function reset() {
    setSnake(START)
    setDir({x: 1, y: 0})
    setFood(randFood(START))
    setScore(0)
    setGameOver(false)
    setRunning(false)
  }

  const cells = useMemo(() => Array.from({length: GRID_W * GRID_H}), [])

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Snake</h1>
        <p className="mt-1 text-sm text-slate-600">Use arrow keys or buttons.</p>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div
            className="mx-auto rounded-lg bg-slate-100"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${GRID_W}, 14px)`,
              gap: "2px",
              width: GRID_W * 14 + (GRID_W - 1) * 2,
            }}
          >
            {cells.map((_, i) => {
              const x = i % GRID_W
              const y = Math.floor(i / GRID_W)
              const isHead = snake[0].x === x && snake[0].y === y
              const isBody = snake.some((s) => s.x === x && s.y === y)
              const isFood = food.x === x && food.y === y
              const cls = isFood
                ? "bg-rose-400"
                : isHead
                  ? "bg-emerald-600"
                  : isBody
                    ? "bg-emerald-400"
                    : "bg-white"
              return (
                <div
                  key={i}
                  className={`h-3.5 w-3.5 rounded-[2px] border border-slate-200 ${cls}`}
                />
              )
            })}
          </div>

          {gameOver && (
            <div className="mt-3 rounded-xl bg-red-50 p-2 text-center text-sm font-semibold text-red-700">
              Game Over
            </div>
          )}
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
            <span>Score: {score}</span>
            <span>Speed: {speed}ms</span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button className={'rounded-xl bg-amber-200 py-2 text-sm font-semibold'} variant={'outline'}
                    onClick={start}>
              <Play/>
            </Button>

            <Button className={'rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700'} variant={'outline'}
                    onClick={pause}>
              <Pause/>
            </Button>

            <Button onClick={reset}
                    className="rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700" variant={'outline'}>
              <RotateCcw/>
            </Button>


            <Button onClick={step}
                    className="rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700" variant={'outline'}>
              <FastForward/>
            </Button>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <Button onClick={() => dir.y !== 1 && setDir({x: 0, y: -1})} variant={'outline'}
                    className="rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700">
              <ArrowBigUp/>
            </Button>
            <div/>
            <Button onClick={() => dir.y !== -1 && setDir({x: 0, y: 1})} variant={'outline'}
                    className="rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700">
              <ArrowBigDown/>
            </Button>
            <Button onClick={() => dir.x !== 1 && setDir({x: -1, y: 0})} variant={'outline'}
                    className="rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700">
              <ArrowBigLeft/>
            </Button>
            <div/>
            <Button onClick={() => dir.x !== -1 && setDir({x: 1, y: 0})} variant={'outline'}
                    className="rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700">
              <ArrowBigRight/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
import {memo, useCallback, useEffect, useRef, useState} from "react"
import {ArrowsUpFromLine, Pause, Play, RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

type Obstacle = { x: number; w: number; h: number }

const GROUND_H = 32
const DINO_W = 28
const DINO_H = 32
const GRAVITY = 0.45
const JUMP_V = 11
const SPEED_START = 2.1

function DinoRunner() {
  const [running, setRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const dinoY = useRef(0) // height above ground
  const dinoV = useRef(0)
  const obstacles = useRef<Obstacle[]>([])
  const speed = useRef(SPEED_START)
  const frame = useRef<number | null>(null)

  const [, setTick] = useState(0)

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.9
    utter.pitch = 1.1
    window.speechSynthesis.speak(utter)
  }

  const spawnObstacle = useCallback(() => {
    const w = 16 + Math.floor(Math.random() * 20)
    const h = 18 + Math.floor(Math.random() * 24)
    obstacles.current.push({x: 340, w, h})
  }, [])

  const reset = useCallback(() => {
    dinoY.current = 0
    dinoV.current = 0
    obstacles.current = []
    speed.current = SPEED_START
    setScore(0)
    setGameOver(false)
    setRunning(false)
  }, [])

  const jump = useCallback(() => {
    if (!running || gameOver) return
    if (dinoY.current === 0) {
      dinoV.current = JUMP_V
    }
  }, [running, gameOver])

  const step = useCallback(() => {
    if (!running || gameOver) return

    dinoV.current -= GRAVITY
    dinoY.current = Math.max(0, dinoY.current + dinoV.current)
    if (dinoY.current === 0 && dinoV.current < 0) dinoV.current = 0

    obstacles.current = obstacles.current
      .map((o) => ({...o, x: o.x - speed.current}))
      .filter((o) => o.x + o.w > -10)

    const shouldSpawn =
      obstacles.current.length === 0 ||
      obstacles.current[obstacles.current.length - 1].x < 220

    if (shouldSpawn && Math.random() < 0.006) spawnObstacle()

    const dinoBox = {x: 40, y: dinoY.current, w: DINO_W, h: DINO_H}
    const hit = obstacles.current.some((o) => {
      const ox = o.x
      const oy = 0
      return (
        dinoBox.x < ox + o.w &&
        dinoBox.x + dinoBox.w > ox &&
        dinoBox.y < oy + o.h &&
        dinoBox.y + dinoBox.h > oy
      )
    })

    if (hit) {
      setGameOver(true)
      setRunning(false)
      return
    }

    setScore((s) => s + 1)
    if (score % 300 === 0) speed.current += 0.1

    setTick((t) => t + 1)
  }, [running, gameOver, spawnObstacle, score])

  useEffect(() => {
    function loop() {
      step()
      frame.current = requestAnimationFrame(loop)
    }

    frame.current = requestAnimationFrame(loop)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [step])

  useEffect(() => {
    if (gameOver) speak("Ooh know!,  Game over!")
  }, [gameOver])

  function start() {
    if (gameOver) reset()
    setRunning(true)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault()
        if (!running && !gameOver) setRunning(true)
        jump()
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [running, gameOver, jump])

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Jump Runner</h1>
        <p className="mt-1 text-sm text-slate-600">Tap or press space to jump.</p>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-100">
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-300"/>

            <div
              className="absolute left-10 rounded-md bg-emerald-500"
              style={{
                bottom: GROUND_H + dinoY.current,
                width: DINO_W,
                height: DINO_H,
              }}
            />

            {obstacles.current.map((o, i) => (
              <div
                key={i}
                className="absolute bg-slate-700"
                style={{left: o.x, width: o.w, height: o.h, bottom: GROUND_H}}
              />
            ))}
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
            <span>{running ? "Running" : "Paused"}</span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button
              onClick={start}
              className="rounded-xl bg-amber-200 py-2 text-sm font-semibold text-slate-800"
              variant={'outline'}
            >
              <Play/>
            </Button>
            <Button
              onClick={() => setRunning(false)}
              className="rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
              variant={'outline'}
            >
              <Pause/>
            </Button>
            <Button
              onClick={reset}
              className="rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
              variant={'outline'}
            >
              <RotateCcw/>
            </Button>
            <Button
              onClick={() => {
                if (!running && !gameOver) setRunning(true)
                jump()
              }}
              className="rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
              variant={'outline'}
            >
              <ArrowsUpFromLine/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(DinoRunner)
"use client"

import {useCallback, useEffect, useMemo, useRef, useState, memo} from "react"
import {ArrowBigDown, ArrowBigLeft, ArrowBigRight, MoveDown, Pause, Play, RefreshCcw, RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
type Board = Cell[][]

type PieceType = "I" | "J" | "L" | "O" | "S" | "T" | "Z"
type Piece = {
  type: PieceType
  shape: number[][]
  color: Cell
}

const BOARD_W = 10
const BOARD_H = 20

const PIECES: Record<PieceType, { shape: number[][]; color: Cell }> = {
  I: {shape: [[1, 1, 1, 1]], color: 1},
  J: {shape: [[1, 0, 0], [1, 1, 1]], color: 2},
  L: {shape: [[0, 0, 1], [1, 1, 1]], color: 3},
  O: {shape: [[1, 1], [1, 1]], color: 4},
  S: {shape: [[0, 1, 1], [1, 1, 0]], color: 5},
  T: {shape: [[0, 1, 0], [1, 1, 1]], color: 6},
  Z: {shape: [[1, 1, 0], [0, 1, 1]], color: 7},
}

const COLORS: Record<Cell, string> = {
  0: "bg-white",
  1: "bg-cyan-400",
  2: "bg-blue-500",
  3: "bg-orange-500",
  4: "bg-yellow-400",
  5: "bg-green-500",
  6: "bg-purple-500",
  7: "bg-red-500",
}

function emptyBoard(): Board {
  return Array.from({length: BOARD_H}, () =>
    Array.from({length: BOARD_W}, () => 0 as Cell)
  )
}

function randomPiece(): Piece {
  const types = Object.keys(PIECES) as PieceType[]
  const type = types[Math.floor(Math.random() * types.length)]
  const base = PIECES[type]
  return {type, shape: base.shape, color: base.color}
}

function rotate(shape: number[][]) {
  const h = shape.length
  const w = shape[0].length
  const res: number[][] = Array.from({length: w}, () => Array(h).fill(0))
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      res[x][h - 1 - y] = shape[y][x]
    }
  }
  return res
}

function collide(board: Board, piece: Piece, pos: { x: number; y: number }) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (!piece.shape[y][x]) continue
      const bx = pos.x + x
      const by = pos.y + y
      if (bx < 0 || bx >= BOARD_W || by >= BOARD_H) return true
      if (by >= 0 && board[by][bx] !== 0) return true
    }
  }
  return false
}

function merge(board: Board, piece: Piece, pos: { x: number; y: number }) {
  const next = board.map((row) => row.slice()) as Board
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const by = pos.y + y
        const bx = pos.x + x
        if (by >= 0) next[by][bx] = piece.color
      }
    }
  }
  return next
}

function sweep(board: Board) {
  let lines = 0
  const next = board.filter((row) => row.some((c) => c === 0)) as Board
  lines = BOARD_H - next.length
  while (next.length < BOARD_H) {
    next.unshift(Array.from({length: BOARD_W}, () => 0 as Cell))
  }
  return {board: next, lines}
}

function getSpeed(level: number) {
  return Math.max(120, 800 - level * 60)
}

function TetrisGame() {
  const [board, setBoard] = useState<Board>(emptyBoard)
  const [piece, setPiece] = useState<Piece>(randomPiece)
  const [nextPiece, setNextPiece] = useState<Piece>(randomPiece)
  const [pos, setPos] = useState({x: 3, y: -1})
  const [running, setRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [level, setLevel] = useState(1)

  const boardRef = useRef(board)
  const pieceRef = useRef(piece)
  const nextRef = useRef(nextPiece)
  const posRef = useRef(pos)
  const linesRef = useRef(lines)

  useEffect(() => {
    boardRef.current = board
  }, [board])
  useEffect(() => {
    pieceRef.current = piece
  }, [piece])
  useEffect(() => {
    nextRef.current = nextPiece
  }, [nextPiece])
  useEffect(() => {
    posRef.current = pos
  }, [pos])
  useEffect(() => {
    linesRef.current = lines
  }, [lines])

  const speed = useMemo(() => getSpeed(level), [level])

  const spawn = useCallback((b: Board) => {
    const newPiece = nextRef.current
    const newPos = {x: 3, y: -1}
    setPiece(newPiece)
    setNextPiece(randomPiece())
    setPos(newPos)
    if (collide(b, newPiece, newPos)) {
      setGameOver(true)
      setRunning(false)
    }
  }, [])

  const lockPiece = useCallback(() => {
    const b = boardRef.current
    const p = pieceRef.current
    const ps = posRef.current

    const merged = merge(b, p, ps)
    const swept = sweep(merged)

    setBoard(swept.board)

    if (swept.lines > 0) {
      const total = linesRef.current + swept.lines
      setLines(total)
      setScore((s) => s + swept.lines * 100)
      setLevel(Math.max(1, Math.floor(total / 5) + 1))
    }

    spawn(swept.board)
  }, [spawn])

  const tickDown = useCallback(() => {
    const b = boardRef.current
    const p = pieceRef.current
    const ps = posRef.current

    const newPos = {x: ps.x, y: ps.y + 1}
    if (!collide(b, p, newPos)) {
      setPos(newPos)
      return
    }
    lockPiece()
  }, [lockPiece])

  const move = useCallback((dir: -1 | 1) => {
    const b = boardRef.current
    const p = pieceRef.current
    const ps = posRef.current
    const newPos = {x: ps.x + dir, y: ps.y}
    if (!collide(b, p, newPos)) setPos(newPos)
  }, [])

  const rotatePiece = useCallback(() => {
    const b = boardRef.current
    const p = pieceRef.current
    const ps = posRef.current
    const rotated = {...p, shape: rotate(p.shape)}
    if (!collide(b, rotated, ps)) setPiece(rotated)
  }, [])

  const hardDrop = useCallback(() => {
    const b = boardRef.current
    const p = pieceRef.current
    const ps = posRef.current
    let y = ps.y
    while (!collide(b, p, {x: ps.x, y: y + 1})) y++
    setPos({x: ps.x, y})
    setTimeout(lockPiece, 0)
  }, [lockPiece])

  useEffect(() => {
    if (!running || gameOver) return
    const id = setInterval(tickDown, speed)
    return () => clearInterval(id)
  }, [running, gameOver, speed, tickDown])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!running || gameOver) return
      if (e.key === "ArrowLeft") move(-1)
      if (e.key === "ArrowRight") move(1)
      if (e.key === "ArrowDown") tickDown()
      if (e.key === "ArrowUp") rotatePiece()
      if (e.key === " ") hardDrop()
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [running, gameOver, move, rotatePiece, tickDown, hardDrop])

  function start() {
    if (gameOver) reset()
    setRunning(true)
  }

  function pause() {
    setRunning(false)
  }

  function reset() {
    const b = emptyBoard()
    setBoard(b)
    setPiece(randomPiece())
    setNextPiece(randomPiece())
    setPos({x: 3, y: -1})
    setScore(0)
    setLines(0)
    setLevel(1)
    setGameOver(false)
  }

  const displayBoard = useMemo(() => {
    const temp = board.map((r) => r.slice()) as Board
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const by = pos.y + y
          const bx = pos.x + x
          if (by >= 0 && by < BOARD_H && bx >= 0 && bx < BOARD_W) {
            temp[by][bx] = piece.color
          }
        }
      }
    }
    return temp
  }, [board, piece, pos])

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Tetris</h1>
        <p className="mt-1 text-sm text-slate-600">
          Use arrows or the buttons below.
        </p>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="grid grid-cols-10 gap-[2px] rounded-lg bg-slate-100 p-2">
              {displayBoard.flat().map((c, i) => (
                <div
                  key={i}
                  className={`h-5 w-5 rounded-[3px] border border-slate-200 ${COLORS[c]}`}
                />
              ))}
            </div>

            <div className="w-20">
              <div className="text-xs font-semibold text-slate-600">Next</div>
              <div className="mt-2 grid gap-1 rounded-lg bg-slate-100 p-2">
                {Array.from({length: 4}).map((_, y) => (
                  <div key={y} className="grid grid-cols-4 gap-1">
                    {Array.from({length: 4}).map((_, x) => {
                      const val = nextPiece.shape[y]?.[x] ? nextPiece.color : 0
                      return (
                        <div
                          key={x}
                          className={`h-4 w-4 rounded-[2px] border border-slate-200 ${COLORS[val as Cell]}`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
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
            <span>Lines: {lines}</span>
            <span>Level: {level}</span>
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
            <Button onClick={hardDrop}
                    className="rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700" variant={'outline'}>
              <MoveDown/>
            </Button>


          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            <Button variant={'outline'} onClick={() => move(-1)}>
              <ArrowBigLeft/>
            </Button>
            <Button variant={'outline'} onClick={rotatePiece}>
              <RefreshCcw/>
            </Button>
            <Button variant={'outline'} onClick={tickDown}>
              <ArrowBigDown/>
            </Button>
            <Button variant={'outline'} onClick={() => move(1)}>
              <ArrowBigRight/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(TetrisGame)
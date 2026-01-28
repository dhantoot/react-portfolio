import {useMemo, useState, memo} from "react"

const NUMBER_WORDS: Record<number, string> = {
  1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
  6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten",
  11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen", 15: "Fifteen",
  16: "Sixteen", 17: "Seventeen", 18: "Eighteen", 19: "Nineteen", 20: "Twenty",
  21: "Twenty-one", 22: "Twenty-two", 23: "Twenty-three", 24: "Twenty-four", 25: "Twenty-five",
  26: "Twenty-six", 27: "Twenty-seven", 28: "Twenty-eight", 29: "Twenty-nine", 30: "Thirty",
}

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

function Numbers1to50() {
  const numbers = useMemo(() => Array.from({length: 30}, (_, i) => i + 1), [])
  const [active, setActive] = useState<number>(1)

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Numbers 1–30</h1>
        <p className="mt-1 text-sm text-slate-600">Tap a number.</p>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-6 gap-2">
            {numbers.map((n) => (
              <button
                key={n}
                onClick={() => {
                  setActive(n)
                  speak(`${n}`)
                }}
                className={`aspect-square rounded-xl border text-sm font-semibold shadow-sm transition active:scale-95 ${
                  active === n ? "bg-amber-200 border-amber-300" : "bg-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm text-center">
          <div className="text-lg font-semibold text-slate-700">
            {NUMBER_WORDS[active]}
          </div>
          <button
            onClick={() => speak(`${active} ${NUMBER_WORDS[active]}`)}
            className="mt-3 w-full rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
          >
            Hear it
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(Numbers1to50)
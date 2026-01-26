import {useMemo, useState} from "react"

type Item = {
  number: number
  name: string
  image: string
}

const ITEMS: Item[] = [
  {number: 1, name: "Dog", image: "/images/dog2.jpg"},
  {number: 2, name: "Cat", image: "/images/cat.jpg"},
  {number: 3, name: "Bear", image: "/images/bear.jpg"},
  {number: 4, name: "Lion", image: "/images/lion.jpg"},
  {number: 5, name: "Fox", image: "/images/fox.jpg"},
  {number: 6, name: "Tiger", image: "/images/tiger.jpg"},
  {number: 7, name: "Elephant", image: "/images/elephant.jpg"},
  {number: 8, name: "Rabbit", image: "/images/rabbit.jpg"},
  {number: 9, name: "Monkey", image: "/images/monkey.jpg"},
  {number: 10, name: "Zebra", image: "/images/zebra.jpg"},
  {number: 11, name: "Giraffe", image: "/images/giraffe.jpg"},
  {number: 12, name: "Whale", image: "/images/whale.jpg"},
  {number: 13, name: "Panda", image: "/images/panda.jpg"},
  {number: 14, name: "Hippo", image: "/images/hippo.jpg"},
  {number: 15, name: "Jaguar", image: "/images/jaguar.jpg"},
  {number: 16, name: "Penguin", image: "/images/penguin.jpg"},
  {number: 17, name: "Koala", image: "/images/koala.png"},
  {number: 18, name: "Deer", image: "/images/deer.jpg"},
  {number: 19, name: "Frog", image: "/images/frog.jpg"},
  {number: 20, name: "Xerus", image: "/images/xerus.jpg"},
]

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

export default function NumbersAndAnimals() {
  const [active, setActive] = useState<Item>(ITEMS[0])
  const tiles = useMemo(() => ITEMS, [])

  function onPick(item: Item) {
    setActive(item)
    speak(`${item.number} ${item.name}`)
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Numbers & Animals</h1>
        <p className="mt-1 text-sm text-slate-600">Tap a number.</p>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {tiles.map((t) => (
              <button
                key={t.number}
                onClick={() => onPick(t)}
                className={`aspect-square rounded-xl border text-sm font-semibold shadow-sm transition active:scale-95 ${
                  active.number === t.number
                    ? "bg-amber-200 border-amber-300"
                    : "bg-white"
                }`}
              >
                {t.number}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-bold text-slate-800">
              {active.number}
            </div>
            <div className="text-lg font-semibold text-slate-700">
              {active.name}
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border">
            <img
              src={active.image}
              alt={active.name}
              className="h-40 w-full object-cover"
            />
          </div>

          <button
            onClick={() => speak(String(`${active.number} ${active.name}`))}
            className="mt-3 w-full rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
          >
            Hear it
          </button>
        </div>
      </div>
    </div>
  )
}
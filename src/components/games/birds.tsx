import {useState} from "react"

type BirdItem = {
  name: string
  image: string
}

const BIRDS: BirdItem[] = [
  {name: "Parrot", image: "/images/parrot.jpg"},
  {name: "Sparrow", image: "/images/sparrow.jpg"},
  {name: "Eagle", image: "/images/eagle.jpg"},
  {name: "Owl", image: "/images/owl.jpg"},
  {name: "Pigeon", image: "/images/pigeon.jpg"},

  {name: "Peacock", image: "/images/peacock.jpg"},
  {name: "Flamingo", image: "/images/flamingo.jpg"},
  {name: "Penguin", image: "/images/penguin.jpg"},
  {name: "Crow", image: "/images/crow.jpg"},
  {name: "Duck", image: "/images/duck.jpg"},

  {name: "Goose", image: "/images/goose.jpg"},
  {name: "Hen", image: "/images/hen.jpg"},
  {name: "Rooster", image: "/images/rooster.jpg"},
  {name: "Turkey", image: "/images/turkey.jpg"},
  {name: "Swan", image: "/images/swan.jpg"},

  {name: "Hawk", image: "/images/hawk.jpg"},
  {name: "Seagull", image: "/images/seagull.jpg"},
  {name: "Woodpecker", image: "/images/woodpecker.jpg"},
  {name: "Robin", image: "/images/robin.jpg"},
  {name: "Kingfisher", image: "/images/kingfisher.jpg"},
]

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

export default function BirdsTapSpeak() {
  const [active, setActive] = useState<BirdItem>(BIRDS[0])

  function onPick(bird: BirdItem) {
    setActive(bird)
    speak(bird.name)
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Birds</h1>
        <p className="mt-1 text-sm text-slate-600">Tap a bird.</p>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {BIRDS.map((b) => (
              <button
                key={b.name}
                onClick={() => onPick(b)}
                className={`aspect-square overflow-hidden rounded-xl border shadow-sm transition active:scale-95 ${
                  active.name === b.name ? "ring-4 ring-amber-200" : ""
                }`}
                aria-label={b.name}
              >
                <img src={b.image} alt={b.name} className="h-full w-full object-cover"/>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm text-center">
          <div className="text-lg font-semibold text-slate-700">{active.name}</div>
          <button
            onClick={() => speak(active.name)}
            className="mt-3 w-full rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
          >
            Hear it
          </button>
        </div>
      </div>
    </div>
  )
}
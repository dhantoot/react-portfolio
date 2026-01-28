import {memo, useState} from "react"

type FishItem = {
  name: string
  image: string
}

const FISH: FishItem[] = [
  {name: "Salmon", image: "/images/salmon.png"},
  {name: "Tuna", image: "/images/tuna.jpg"},
  {name: "Goldfish", image: "/images/goldfish.jpg"},
  {name: "Clownfish", image: "/images/clownfish.jpg"},
  {name: "Betta", image: "/images/betta.jpg"},

  {name: "Guppy", image: "/images/guppy.jpg"},
  {name: "Angelfish", image: "/images/angelfish.jpg"},
  {name: "Swordfish", image: "/images/swordfish.jpg"},
  {name: "Mackerel", image: "/images/mackerel.jpg"},
  {name: "Cod", image: "/images/cod.jpg"},

  {name: "Herring", image: "/images/herring.jpg"},
  {name: "Sardine", image: "/images/sardine.jpg"},
  {name: "Trout", image: "/images/trout.jpg"},
  {name: "Carp", image: "/images/carp.jpg"},
  {name: "Catfish", image: "/images/catfish.jpg"},

  {name: "Eel", image: "/images/eel.jpg"},
  {name: "Stingray", image: "/images/stingray.jpg"},
  {name: "Shark", image: "/images/shark.jpg"},
  {name: "Seahorse", image: "/images/seahorse.jpg"},
  {name: "Pufferfish", image: "/images/pufferfish.jpg"},
]

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

function FishTapSpeak() {
  const [active, setActive] = useState<FishItem>(FISH[0])

  function onPick(fish: FishItem) {
    setActive(fish)
    speak(fish.name)
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Fish</h1>
        <p className="mt-1 text-sm text-slate-600">Tap a fish.</p>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {FISH.map((f) => (
              <button
                key={f.name}
                onClick={() => onPick(f)}
                className={`aspect-square overflow-hidden rounded-xl border shadow-sm transition active:scale-95 ${
                  active.name === f.name ? "ring-4 ring-amber-200" : ""
                }`}
                aria-label={f.name}
              >
                <img src={f.image} alt={f.name} className="h-full w-full object-cover"/>
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

export default memo(FishTapSpeak)
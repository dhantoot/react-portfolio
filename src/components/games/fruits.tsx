import {memo, useState} from "react"

type FruitItem = {
  name: string
  image: string
}

const FRUITS: FruitItem[] = [
  {name: "Apple", image: "/images/apple.jpg"},
  {name: "Banana", image: "/images/banana.jpg"},
  {name: "Orange", image: "/images/orange.jpg"},
  {name: "Grapes", image: "/images/grapes.jpg"},
  {name: "Strawberry", image: "/images/strawberry.jpg"},

  {name: "Mango", image: "/images/mango.jpg"},
  {name: "Pineapple", image: "/images/pineapple.jpg"},
  {name: "Watermelon", image: "/images/watermelon.jpg"},
  {name: "Papaya", image: "/images/papaya.jpg"},
  {name: "Cherry", image: "/images/cherry.jpg"},

  {name: "Peach", image: "/images/peach.jpg"},
  {name: "Pear", image: "/images/pear.jpg"},
  {name: "Kiwi", image: "/images/kiwi.jpg"},
  {name: "Lemon", image: "/images/lemon.jpg"},
  {name: "Lime", image: "/images/lime.jpg"},

  {name: "Blueberry", image: "/images/blueberry.jpg"},
  {name: "Raspberry", image: "/images/raspberry.jpg"},
  {name: "Coconut", image: "/images/coconut.jpg"},
  {name: "Avocado", image: "/images/avocado.jpg"},
  {name: "Pomegranate", image: "/images/pomegranate.jpg"},
]

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

function FruitsTapSpeak() {
  const [active, setActive] = useState<FruitItem>(FRUITS[0])

  function onPick(fruit: FruitItem) {
    setActive(fruit)
    speak(fruit.name)
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Fruits</h1>
        <p className="mt-1 text-sm text-slate-600">Tap a fruit.</p>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {FRUITS.map((f) => (
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

export default  memo(FruitsTapSpeak)
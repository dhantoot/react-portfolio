import {useState, memo} from "react"

type VegItem = {
  name: string
  image: string
}

const VEGGIES: VegItem[] = [
  {name: "Carrot", image: "/images/carrot.jpg"},
  {name: "Broccoli", image: "/images/broccoli.jpg"},
  {name: "Tomato", image: "/images/tomato.jpg"},
  {name: "Potato", image: "/images/potato.jpg"},
  {name: "Onion", image: "/images/onion.jpg"},

  {name: "Cucumber", image: "/images/cucumber.jpg"},
  {name: "Pepper", image: "/images/pepper.jpg"},
  {name: "Lettuce", image: "/images/lettuce.jpg"},
  {name: "Spinach", image: "/images/spinach.jpg"},
  {name: "Cabbage", image: "/images/cabbage.jpg"},

  {name: "Corn", image: "/images/corn.jpg"},
  {name: "Eggplant", image: "/images/eggplant.jpg"},
  {name: "Zucchini", image: "/images/zucchini.jpg"},
  {name: "Pumpkin", image: "/images/pumpkin.jpg"},
  {name: "Radish", image: "/images/radish.jpg"},

  {name: "Mushroom", image: "/images/mushroom.jpg"},
  {name: "Peas", image: "/images/peas.jpg"},
  {name: "Cauliflower", image: "/images/cauliflower.jpg"},
  {name: "Garlic", image: "/images/garlic.jpg"},
  {name: "Beetroot", image: "/images/beetroot.jpg"},
]

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

function VeggiesTapSpeak() {
  const [active, setActive] = useState<VegItem>(VEGGIES[0])

  function onPick(veg: VegItem) {
    setActive(veg)
    speak(veg.name)
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Veggies</h1>
        <p className="mt-1 text-sm text-slate-600">Tap a vegetable.</p>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {VEGGIES.map((v) => (
              <button
                key={v.name}
                onClick={() => onPick(v)}
                className={`aspect-square overflow-hidden rounded-xl border shadow-sm transition active:scale-95 ${
                  active.name === v.name ? "ring-4 ring-amber-200" : ""
                }`}
                aria-label={v.name}
              >
                <img src={v.image} alt={v.name} className="h-full w-full object-cover"/>
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

export default memo(VeggiesTapSpeak)
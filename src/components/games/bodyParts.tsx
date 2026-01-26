import {useState} from "react"

type BodyItem = {
  name: string
  image: string
}

const BODY_PARTS: BodyItem[] = [
  {name: "Eyes", image: "/images/eyes.jpg"},
  {name: "Nose", image: "/images/nose.jpg"},
  {name: "Mouth", image: "/images/mouth.jpg"},
  {name: "Ear", image: "/images/ear.jpg"},
  {name: "Hair", image: "/images/hair.jpg"},

  {name: "Head", image: "/images/head.jpg"},
  {name: "Neck", image: "/images/neck.jpg"},
  {name: "Shoulder", image: "/images/shoulder.jpg"},
  {name: "Arm", image: "/images/arm.jpg"},
  {name: "Hand", image: "/images/hand.jpg"},

  {name: "Finger", image: "/images/finger.jpg"},
  {name: "Chest", image: "/images/chest.jpg"},
  {name: "Tummy", image: "/images/tummy.jpg"},
  {name: "Leg", image: "/images/leg.jpg"},
  {name: "Knee", image: "/images/knee.jpg"},

  {name: "Foot", image: "/images/foot.jpg"},
  {name: "Toes", image: "/images/toes.jpg"},
  {name: "Back", image: "/images/back.jpg"},
  {name: "Elbow", image: "/images/elbow.jpg"},
  {name: "Chin", image: "/images/chin.jpg"},
]

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

export default function BodyPartsTapSpeak() {
  const [active, setActive] = useState<BodyItem>(BODY_PARTS[0])

  function onPick(part: BodyItem) {
    setActive(part)
    speak(part.name)
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Body Parts</h1>
        <p className="mt-1 text-sm text-slate-600">Tap a body part.</p>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {BODY_PARTS.map((p) => (
              <button
                key={p.name}
                onClick={() => onPick(p)}
                className={`aspect-square overflow-hidden rounded-xl border shadow-sm transition active:scale-95 ${
                  active.name === p.name ? "ring-4 ring-amber-200" : ""
                }`}
                aria-label={p.name}
              >
                <img src={p.image} alt={p.name} className="h-full w-full object-cover"/>
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
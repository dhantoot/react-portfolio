import {memo, useMemo, useState} from "react"

type Letter = string

type Animal = {
  letter: Letter
  name: string
  image: string
}

const ANIMALS: Animal[] = [
  {letter: "A", name: "Alligator", image: "/images/alligator.jpg"},
  {letter: "B", name: "Bear", image: "/images/bear.jpg"},
  {letter: "C", name: "Cat", image: "/images/cat.jpg"},
  {letter: "D", name: "Dog", image: "/images/dog2.jpg"},
  {letter: "E", name: "Elephant", image: "/images/elephant.jpg"},
  {letter: "F", name: "Fox", image: "/images/fox.jpg"},
  {letter: "G", name: "Giraffe", image: "/images/giraffe.jpg"},
  {letter: "H", name: "Hippo", image: "/images/hippo.jpg"},
  {letter: "I", name: "Iguana", image: "/images/iguana.jpg"},
  {letter: "J", name: "Jaguar", image: "/images/jaguar.jpg"},
  {letter: "K", name: "Koala", image: "/images/koala.png"},
  {letter: "L", name: "Lion", image: "/images/lion.jpg"},
  {letter: "M", name: "Monkey", image: "/images/monkey.jpg"},
  {letter: "N", name: "Narwhal", image: "/images/narwhal.png"},
  {letter: "O", name: "Octopus", image: "/images/octopus.jpg "},
  {letter: "P", name: "Penguin", image: "/images/penguin.jpg"},
  {letter: "Q", name: "Quail", image: "/images/quail.jpg"},
  {letter: "R", name: "Rabbit", image: "/images/rabbit.jpg"},
  {letter: "S", name: "Snake", image: "/images/snake2.jpg "},
  {letter: "T", name: "Tiger", image: "/images/tiger.jpg"},
  {letter: "U", name: "Urchin", image: "/images/urchin.jpg"},
  {letter: "V", name: "Vulture", image: "/images/vulture.jpg"},
  {letter: "W", name: "Whale", image: "/images/whale.jpg"},
  {letter: "X", name: "Xerus", image: "/images/xerus.jpg"},
  {letter: "Y", name: "Yak", image: "/images/yak.jpg"},
  {letter: "Z", name: "Zebra", image: "/images/zebra.jpg"},
]

function speak(text: string) {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.9
  utter.pitch = 1.1
  window.speechSynthesis.speak(utter)
}

 function Alphabet() {
  const [active, setActive] = useState<Animal>(ANIMALS[0])

  const tiles = useMemo(() => ANIMALS, [])

  function onPick(animal: Animal) {
    setActive(animal)
    speak(`${animal.letter},  ${animal.name}.`)
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Alphabet Animals</h1>
        <p className="mt-1 text-sm text-slate-600">Tap a letter to see the animal.</p>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-6 gap-2">
            {tiles.map((t) => (
              <button
                key={t.letter}
                onClick={() => onPick(t)}
                className={`aspect-square rounded-xl border text-sm font-semibold shadow-sm transition active:scale-95 ${
                  active.letter === t.letter
                    ? "bg-amber-200 border-amber-300"
                    : "bg-white"
                }`}
              >
                {t.letter.toUpperCase()}
                <div className="text-[9px] text-slate-500">{t.letter.toLowerCase()}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-bold text-slate-800">
              {active.letter}
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
            onClick={() => speak(`${active.letter},  ${active.name}.`)}
            className="mt-3 w-full rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
          >
            Hear it
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(Alphabet)
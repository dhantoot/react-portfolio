import {memo, useRef, useState} from "react"

type Animal = {
  name: string
  soundSrc: string
  image: string
}

const ANIMALS: Animal[] = [
  {name: "Cow", soundSrc: '/audio/cow.mp3', image: "/images/cow.jpg"},
  {name: "Cat", soundSrc: "/audio/cat.mp3", image: "/images/cat.jpg"},
  {name: "Dog", soundSrc: "/audio/dog.mp3", image: "/images/dog.jpg"},
  {name: "Sheep", soundSrc: "/audio/sheep.mp3", image: "/images/sheep.jpg"},
  {name: "Pig", soundSrc: "/audio/pig.mp3", image: "/images/pig.jpg"},

  {name: "Duck", soundSrc: "/audio/duck.mp3", image: "/images/duck.jpg"},
  {name: "Chicken", soundSrc: "/audio/chicken.mp3", image: "/images/chicken.jpg"},
  {name: "Horse", soundSrc: "/audio/horse.mp3", image: "/images/horse.jpg"},
  {name: "Frog", soundSrc: "/audio/frog.mp3", image: "/images/frog.jpg"},
  {name: "Bee", soundSrc: "/audio/bee.mp3", image: "/images/bee.jpg"},

  {name: "Lion", soundSrc: "/audio/lion.mp3", image: "/images/lion.jpg"},
  {name: "Elephant", soundSrc: "/audio/elephant.mp3", image: "/images/elephant.jpg"},
  {name: "Owl", soundSrc: "/audio/owl.mp3", image: "/images/owl.jpg"},
  {name: "Goat", soundSrc: "/audio/goat.mp3", image: "/images/goat.jpg"},
  {name: "Turkey", soundSrc: "/audio/turkey.mp3", image: "/images/turkey.jpg"},

  {name: "Wolf", soundSrc: "/audio/wolf.mp3", image: "/images/wolf.jpg"},
  {name: "Monkey", soundSrc: "/audio/monkey.mp3", image: "/images/monkey.jpg"},
  {name: "Donkey", soundSrc: "/audio/donkey.mp3", image: "/images/donkey.jpg"},
  {name: "Crow", soundSrc: "/audio/crow.mp3", image: "/images/crow.jpg"},
  {name: "Snake", soundSrc: "/audio/snake.mp3", image: "/images/snake.jpg"},
]

function AnimalSounds() {
  const [active, setActive] = useState<Animal>(ANIMALS[0])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function play(src: string) {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    const audio = new Audio(src)
    audioRef.current = audio
    audio.play()
  }

  function onPick(a: Animal) {
    setActive(a)
    play(a.soundSrc)
  }

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-slate-800">Animal Sounds</h1>
        <p className="mt-1 text-sm text-slate-600">Tap an animal.</p>

        <div className="mt-4 rounded-2xl border bg-white p-3 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {ANIMALS.map((a) => (
              <button
                key={a.name}
                onClick={() => onPick(a)}
                className={`aspect-square overflow-hidden rounded-xl border shadow-sm transition active:scale-95 ${
                  active.name === a.name ? "ring-4 ring-amber-200" : ""
                }`}
              >
                <img src={a.image} alt={a.name} className="h-full w-full object-cover"/>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="text-lg font-semibold text-slate-700">
            {active.name}
          </div>
          <button
            onClick={() => play(active.soundSrc)}
            className="mt-3 w-full rounded-xl bg-slate-100 py-2 text-sm font-semibold text-slate-700"
          >
            Hear it
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(AnimalSounds)
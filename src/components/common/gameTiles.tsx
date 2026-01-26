import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

import {memo, useState} from "react"

type GameTilesProps = {
  onClicked?: (title: string, index: number) => void,
  isActive?: (index: number) => boolean,
}

function GameTiles({onClicked, isActive}: GameTilesProps) {

  const [gameTitles] = useState<string[]>([
    'Alphabet',
    'Shape & Color matching',
    'Numbers & Animals',
    'Colors',
    'Find the Color',
    'Numbers',
    'Shape',
    'Find the Shape',
    'Match Color',
    'Animal Sound',
    'Match Shape',
    'Find Body Parts',
    'Body Parts',
    'Fruits',
    'Veggies',
    'Fish',
    'Birds',
    'Alphabet Tracing',
    'Tetris',
    'Snake',
    'dino',
    //'Shape Dropbox'
  ])

  return (
    <Carousel className="relative w-full" opts={{
      align: "start",
      slidesToScroll: 3, // jump 4 tiles per swipe/click
    }}>
      <CarouselContent className="-ml-2">
        {gameTitles.map((title, index) => (
          <CarouselItem
            key={index}
            className={`basis-1/4 pl-2 sm:basis-1/5 md:basis-1/6 lg:basis-1/8 `}
          >
            <Card className={`rounded-lg`}>
              <CardContent className={`flex aspect-square items-center justify-center p-2 my-0.5 ${
                index && isActive?.(index) ? "ring-4 ring-amber-200 rounded" : ""
              }`}>
                <button
                  type="button"
                  onClick={() => onClicked?.(title, index)}
                  className={`text-[10px] sm:text-xs font-semibold text-center w-full h-full`}
                >
                  {title}
                </button>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 opacity-50 hover:opacity-100"/>
      <CarouselNext className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 opacity-50 hover:opacity-100"/>
    </Carousel>
  )
}

export default memo(GameTiles)
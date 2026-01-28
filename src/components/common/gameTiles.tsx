import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

import { memo, useState } from "react";

type GameTilesProps = {
  onClicked?: (title: string, index: number) => void;
  isActive?: (index: number) => boolean;
};

type GameTile = {
  title: string;
  image: string; // relative or absolute path
};

function GameTiles({ onClicked, isActive }: GameTilesProps) {
  const [gameTitles] = useState<GameTile[]>([
    { title: "Alphabet", image: "/images/carousel/learnAlphabet.png" },
    { title: "Shape & Color matching", image: "/images/carousel/shapeColor.png" },
    { title: "Numbers & Animals", image: "/images/carousel/numbersAnimals.png" },
    { title: "Colors", image: "/images/carousel/colors.png" },
    { title: "Find the Color", image: "/images/carousel/findColor.png" },
    { title: "Numbers", image: "/images/carousel/numbers.png" },
    { title: "Shape", image: "/images/carousel/shape.png" },
    { title: "Find the Shape", image: "/svg/ShapeSearchIcon.svg" },
    { title: "Match Color", image: "/svg/matchColor.svg" },
    { title: "Animal Sound", image: "/svg/animalSound.svg" },
    { title: "Match Shape", image: "/svg/matchShape.svg" },
    { title: "Find Body Parts", image: "/svg/findBodyParts.svg" },
    { title: "Body Parts", image: "/svg/bodyParts.svg" },
    { title: "Fruits", image: "/svg/fruits.svg" },
    { title: "Veggies", image: "/svg/veggies.svg" },
    { title: "Fish", image: "/svg/fish.svg" },
    { title: "Birds", image: "/svg/birds.svg" },
    { title: "Alphabet Tracing", image: "/svg/alphabetTracing.svg" },
    { title: "Tetris", image: "/svg/tetris.svg" },
    { title: "Snake", image: "/svg/snake.svg" },
    { title: "Dino", image: "/svg/dino.svg" },
    // { title: "Shape Dropbox", image: "/images/carousel/shapeDropbox.png" },
  ]);

  return (
    <Carousel className="relative w-full" opts={{ align: "start", slidesToScroll: 3 }}>
      <CarouselContent className="-ml-2">
        {gameTitles.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-1/4 pl-2 sm:basis-1/5 md:basis-1/6 lg:basis-1/8"
          >
            <Card className="rounded-lg">
              <CardContent
                className={`flex aspect-square items-center justify-center p-1 my-0.5 ${
                  index > -1 && isActive?.(index) ? "ring-4 ring-fuchsia-500 rounded-lg" : ""
                }`}
              >
                <Button
                  aria-label={item.title}
                  onClick={() => onClicked?.(item.title, index)}
                  // Use inline style to avoid Tailwind purge issues with dynamic URLs
                  style={{ backgroundImage: `url(${item.image})` }}
                  className="
                    relative
                    block w-full h-full p-0
                    rounded-lg overflow-hidden
                    bg-cover bg-center bg-no-repeat
                    shadow-none
                    hover:opacity-90
                    focus-visible:ring-2 focus-visible:ring-ring
                    before:content-[''] before:absolute before:inset-0 before:bg-black/20 before:pointer-events-none
                  "
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 opacity-50 hover:opacity-100" />
      <CarouselNext className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 opacity-50 hover:opacity-100" />
    </Carousel>
  );
}

export default memo(GameTiles);
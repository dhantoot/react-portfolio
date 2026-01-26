import {memo, useState} from "react"
import {CheckCircle2Icon} from "lucide-react"
import {Badge} from "@/components/ui/badge"

function Skills() {

  const [skillSet] = useState<string[]>([
    'Javascript',
    'Typescript',
    'VueJs',
    'QuasarJs',
    'ReactJs',
    'NextJs',
    'Shadcn',
    'Tailwind',
    'Express',
    'Restify',
    'Loopback',
    'NestJs',
    'Java SE',
    'PHP',
    'Python',
    'Django',
    'Firebase',
    'Bull',
    'Sinon',
    'Mocha',
    'Jest',
  ])
  const step = 0.08 // seconds between each item

  return (
    <>
      {
        skillSet.map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            /*
               flex-grow: allows them to fill the row
               basis-[calc(50%-8px)]: forces roughly 2 items per row (accounting for gap)
               max-w-[calc(50%-4px)]: prevents a 3rd item from squeezing in
            */
            className="text-[10px] md:text-xs flex items-center gap-1 flex-grow basis-[calc(50%-8px)] max-w-[calc(50%-4px)] h-fit shrink-0"
          >
            <CheckCircle2Icon size={12} className={`shrink-0  animate-sweep`}
                              style={{animationDelay: `${index * step}s`}}/>
            <span className="truncate">{skill}</span>
          </Badge>
        ))
      }
    </>
  )
}

export default memo(Skills)
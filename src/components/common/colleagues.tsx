import * as React from "react"
import {memo} from "react"
import {Link } from "lucide-react"

import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

const people = [
  {
    username: "Ron Soriano",
    avatar: "https://github.com/shadcn.png",
    email: "ron.soriano@sls.com.au",
    githubLink: 'https://www.linkedin.com/in/ron-terrie-soriano/',
  },
  {
    username: "Wilbert Santos",
    avatar: "https://github.com/maxleiter.png",
    email: "wilbert.santos@sls.com.au",
    githubLink: 'https://www.linkedin.com/in/wilbertsntos/',
  },
  {
    username: "Joseph Magsajo",
    avatar: "https://github.com/evilrabbit.png",
    email: "joseph.magsajo@sls.com.au",
    githubLink: 'https://www.linkedin.com/in/joseph-magsajo-a239a442/',
  },
]

function Colleagues() {
  return (
    <div className="flex w-full flex flex-col gap-6">
      <ItemGroup className={''}>
        {people.map((person, index) => (
          <React.Fragment key={person.username}>
            <Item size={'sm'} className={''}>
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={person.avatar} className="grayscale"/>
                  <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{person.username}</ItemTitle>
                <ItemDescription>{person.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button asChild variant="ghost" size="sm" className="">
                  <a href={person.githubLink} target={'_blank'}><Link className="w-5 h-5"/></a>
                </Button>
              </ItemActions>
            </Item>
            {index !== people.length - 1 && <ItemSeparator/>}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
  )
}

export default memo(Colleagues)

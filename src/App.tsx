import {
  AtSign,
  CheckCircle2Icon,
  Component,
  Expand,
  GitBranch,
  House,
  Link,
  MapPinHouse,
  MessageCircleMore,
  Phone
} from "lucide-react"

import {Separator} from "@/components/ui/separator"

import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"

import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"

import {Card,} from "@/components/ui/card"

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"

import {Alert, AlertDescription, AlertTitle,} from "@/components/ui/alert"


import {Badge} from "@/components/ui/badge";

import {useState,} from "react";


// Component imports
import WorkExperience from "./components/common/workExperience";
import Colleagues from "./components/common/colleagues.tsx"
import PanelCard from "@/components/common/panelCard.tsx";

// Type declaration
type WorkExperience = {
  id: number
  title: string
  organization: string
  dateStart: string
  dateEnd: string
  roles: string[]
}

type Education = {
  id: number
  university: string
  degree: string
  major: string
  graduatedAt: string
  skills: string[]
}


const App = () => {
  const [workExperiences] = useState<WorkExperience[]>([
    {
      id: 1,
      title: 'Senior Software Developer',
      organization: 'Flat Planet (Surf Life Saving Australia)',
      dateStart: 'Jul 2024',
      dateEnd: 'Present',
      roles: [
        'API Development (NodeJs - NestJs in Typescript).',
        'Frontend Development (Vue - QuasarJs, React - NextJs).',
      ],
    },
    {
      id: 2,
      title: 'Software Developer',
      organization: 'Collabera Digital (Metrobank)',
      dateStart: 'Nov 2023',
      dateEnd: 'May 2024',
      roles: [
        'API Development (NodeJs - Loopback 3 in Typescript).',
        'Unit Testing (SinonJs, Mocha).',
        'Scheduling and Background Services (BullJobs + ioRedis).',
        'OS Crontab, Shell scripts.'
      ],
    },
    {
      id: 3,
      title: 'GCM-3 Associate Consultant',
      organization: 'ATOS Syntel (Humana)',
      dateStart: 'Nov 2021',
      dateEnd: 'Sept 2023',
      roles: [
        'Frontend integration to existing and new feature (Angular).',
        'API Development (NodeJs Azure Function-app).',
        'Integration and unit testing (Jest).',
        'Azure deployment.'
      ],
    },
    {
      id: 4,
      title: 'Software Developer',
      organization: 'First Performance Global',
      dateStart: 'May 2019',
      dateEnd: 'Aug 2021',
      roles: [
        'Frontend Development (VueJs - VueBootstrap).',
        'API Development (NodeJs - Restify, KnexJs ORM).',
        'Integration and unit testing (SinonJs).',
        'Python scripts for loading oneshot data.'
      ],
    },
    {
      id: 5,
      title: 'Backend Developer',
      organization: 'Freelance',
      dateStart: 'Nov 2018',
      dateEnd: 'Mar 2019',
      roles: [
        'API Development (NodeJs + Sequelize ORM).',
        'Database Design.',
        'Deployment (AWS EC2 windows instance running on IIS).',
      ],
    },
    {
      id: 6,
      title: 'Fullstack Developer',
      organization: '4LOOP Inc.',
      dateStart: 'May 2015',
      dateEnd: 'Nov 2018',
      roles: [
        'Frontend design and development (Angular1, VueJs).',
        'API Development (NodeJs - Express, Django).',
        'Database Design.',
        'Deployment (AWS EC2, Digital Ocean).',
        'Python scripts for loading data.',
        'Lead the development of several projects.'
      ],
    }
  ])

  const [education] = useState<Education[]>([
    {
      id: 1,
      university: 'Mindanao State University',
      degree: 'BSIT, Bachelor of Science in Information Technology',
      major: 'Database Systems',
      graduatedAt: 'April 2014',
      skills: [
        'Programming Foundations (Java, c++)',
        'Database Design',
        'Datastructures and Algorithm',
      ]
    }
  ])

  // const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className='flex flex-row items-start justify-center min-h-screen gap-5'>

      <div className="hidden md:flex md:w-auto h-full items-start justify-center flex-1 p-2">
        <Alert className={''}>
          <CheckCircle2Icon size={15}/>
          <AlertTitle className={'text-xs'}>Welcome!</AlertTitle>
          <AlertDescription className={'text-xs'}>
            This portfolio is built using react + tailwind + shadcn + lucide
          </AlertDescription>
        </Alert>
      </div>

      <div className="py-2 flex w-full md:w-3/4 lg:w-1/2 h-full min-h-0">
        <Tabs defaultValue="account" className="h-full w-full">

          <TabsList className="mx-2 md:mx-0 md:px-0 flex flex-row">
            <TabsTrigger value="account">
              <House className="h-4 w-4"/>
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
            <TabsTrigger value="softtech" className="text-xs">Software & Technology</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="h-full">
            <Card className="
              border-0 shadow-none md:border md:shadow-sm
              flex flex-col
              p-2 gap-4
              h-full w-full
              min-h-0
            ">
              {/* Avatar */}
              <div className="flex justify-center md:justify-start w-full">
                <div className="">
                  <Avatar className="rounded-lg h-20 w-20">
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/6210314?v=4"
                      alt="@dhantoot"
                    />
                    <AvatarFallback>
                      <img
                        className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                        alt="@dhantoot"
                      />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Name */}
              <div className="flex justify-center md:justify-start w-full">
                <div className="">Tagailo, Dan Vincent</div>
              </div>

              {/* Heading Text*/}
              <div className="flex flex-col justify-start w-full">
                <div className="text-xs"><p>Professional Title</p></div>

                <Separator className="mb-5"/>
                <div className={`
                  flex
                  flex-col
                  md:flex-row
                  justify-between
                  gap-4
                  md:gap-0
                `}>

                  {/* Contact*/}
                  <div className="w-full md:w-1/3 flex flex-col md:gap-1 break-words">
                    <p className="text-xs font-bold text-blue-900">Contact</p>
                    <p className="text-xs flex items-center gap-1"><MapPinHouse className="h-3 w-3 shrink-0"/>Cagayan de
                      Oro City</p>
                    <p className="text-xs flex items-center gap-1"><Phone className="h-3 w-3 shrink-0"/>+63 968 5828 627
                    </p>
                    <p className="text-xs flex items-center gap-1"><AtSign className="h-3 w-3 shrink-0"/>tagailo.danvincent@gmail.com
                    </p>
                    <a href="https://www.linkedin.com/in/dhanixblue" target="_blank"
                       className="text-xs underline flex items-center gap-1"><Link className="h-3 w-3 shrink-0"/>linkedin.com/in/dhanixblue</a>
                  </div>

                  {/* Profile */}
                  <div className="w-full md:w-2/3 flex flex-col gap-1">
                    <p className="text-xs font-bold text-blue-900">Profile</p>
                    <p className="text-xs">For over a decade, Dan has worked in the IT industry developing software
                      applications across a wide range of
                      backend and frontend technologies. He is a full-stack developer with experience in requirement
                      analysis,
                      UI design and integration, API development with unit and integration testing, database design, and
                      deployment.
                      His experience working on diverse projects using various technologies and frameworks has shaped
                      his ability
                      to quickly adapt to client requirements and deliver results efficiently.</p>
                  </div>
                </div>

                <div className="flex flex-col flex-1 min-h-0 md:flex-row justify-between">

                  {/* Skills */}
                  <div className="w-full md:w-1/3 flex flex-col gap-1 md:pr-5">
                    <Separator className="mt-5"/>
                    <p className="text-xs font-bold text-blue-900">Skills</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
                      <div>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Javascript
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Typescript
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>VueJs
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>QuasarJs
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>ReactJs
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>NextJs
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Shadcn
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Tailwind
                        </p>
                      </div>

                      <div>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Express
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Restify
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Loopback
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>NestJs
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Java SE
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>PHP</p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Python
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Django
                        </p>
                      </div>

                      <div>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Firebase
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Bull</p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Sinon
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Mocha
                        </p>
                        <p className="text-xs flex items-center gap-1"><Component className="h-2 w-2 shrink-0"/>Jest</p>
                      </div>
                    </div>


                  </div>

                  {/* Work Experience */}
                  <div className="w-full md:w-2/3 flex flex-col h-full">

                    <div className="flex flex-col h-full min-h-0">
                      {/* Top */}
                      <div className="shrink-0 mt-1">
                        <Separator className="mt-4 mb-1"/>
                        <div className="flex flex-row justify-between items-start">
                          <p className="text-xs font-bold text-blue-900 mb-1">Work Experience</p>
                          <div className="flex flex-row justify-end items-center gap-2 w-1/2">

                            <Dialog>
                              <DialogTrigger>
                                <Expand
                                  className="hidden md:block h-3 w-3 mt-1 transition-transform duration-200 hover:scale-150"/>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="text-bold">
                                    Work Experiences
                                  </DialogTitle>
                                </DialogHeader>
                                <WorkExperience workExperiences={workExperiences} expanded={true}/>
                              </DialogContent>
                            </Dialog>

                          </div>
                        </div>
                      </div>

                      {/* Middle – autofill */}
                      <div className="flex-1 min-h-0 md:overflow-y-auto scrollbar">
                        <WorkExperience workExperiences={workExperiences} expanded={false}/>
                      </div>

                      {/* Bottom */}
                      <div className="shrink-0">
                        <Separator className="mt-3"/>
                        <p className="text-xs font-bold text-blue-900 mb-1 mt-1">Education</p>
                        {
                          education.map((education) => {
                            return (
                              <section className="">
                                <p className="text-xs font-medium">{education?.university}</p>
                                <p className="text-xs font-light">{education?.degree}</p>
                                <p className="text-xs font-light">{education?.major}</p>
                                <p className="text-xs font-light">{education?.graduatedAt}</p>
                                <ul className="pl-4">
                                  {
                                    education?.skills.map((skill) => {
                                      return (
                                        <li className="text-xs font-light">{skill}</li>
                                      )
                                    })
                                  }
                                </ul>
                              </section>
                            )
                          })
                        }
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </Card>
          </TabsContent>

          <TabsContent value="projects" className="h-full">
            <Card
              className="border-0 shadow-none md:border md:shadow-sm flex flex-row p-2 gap-4 justify-between items-start h-full w-full">
              <div className="flex justify-start flex-1">
                <div className="text-xs">
                  Relevant Projects
                </div>
              </div>
              <div className="flex justify-start flex-1">
                <div className="text-xs">
                  Other Projects
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="softtech" className="h-full">
            <Card
              className="border-0 shadow-none md:border md:shadow-sm flex flex-row p-2 gap-4 justify-between items-start h-full w-full">
              <div className="flex justify-start w-full">
                <div className="text-xs">
                  Technology stack
                </div>
              </div>
            </Card>
          </TabsContent>

        </Tabs>
      </div>

      <div
        className="
          hidden md:flex
          md:flex-col
          md:w-auto
          min-h-screen
          items-start
          justify-between
          flex-1
          px-2
          gap-5
          py-2
          min-h-0
        ">
        {/* Top */}
        <div
          className="
            flex
            flex-col
            gap-4
            w-full
            shrink-0
          ">
          <PanelCard
            title={
              <div className={'flex flex-row gap-1'}>
                <Link size={15}/>
                Connections
              </div>
            }
            subtitle={
              <div className={'flex flex-row gap-1'}>
                <Badge className="h-3 min-w-3 rounded-full px-1 font-mono tabular-nums bg-outline bg-green-500"/>
                <Badge className="h-3 min-w-3 rounded-full px-1 font-mono tabular-nums bg-outline bg-yellow-500"/>
                <Badge className="h-3 min-w-3 rounded-full px-1 font-mono tabular-nums bg-outline bg-red-500"/>
              </div>
            }
          >
            <Colleagues/>
          </PanelCard>

        </div>

        {/* Middle */}
        <div
          className="
            flex flex-col
            gap-4
            w-full
            flex-1
          ">
          <PanelCard
            title={
              <div className={'flex flex-row gap-1'}>
                <GitBranch size={15}/>
                Repositories
              </div>
            }
            subtitle={
              <div className={'flex flex-row gap-1'}>
                <Badge className="h-3 min-w-3 rounded-full px-1 font-mono tabular-nums bg-outline bg-green-500"/>
                <Badge className="h-3 min-w-3 rounded-full px-1 font-mono tabular-nums bg-outline bg-yellow-500"/>
                <Badge className="h-3 min-w-3 rounded-full px-1 font-mono tabular-nums bg-outline bg-red-500"/>
              </div>
            }>
            <p className={'text-xs'}>Hello World</p>
          </PanelCard>


        </div>

        {/* Chatbox */}
        <div
          className="
            shrink-0
            md:shadow-sm
            flex flex-col
            w-full
            min-h-0
            md:max-h-[40vh]
            rounded-xl
            overflow-hidden
            bg-white
          ">

          <PanelCard
            title={
              <div className={'flex flex-row gap-1'}>
                <MessageCircleMore size={15}/>
                Chat
              </div>
            }
            subtitle={
              <div className={'flex flex-row gap-1 items-center'}>
                <Badge className="h-3 min-w-3 rounded-full px-1 font-mono tabular-nums bg-outline bg-green-500"/>Online
              </div>
            }
            className="md:h-[40vh]"
            footer={
              <div className="flex items-center gap-2">
                <input
                  placeholder="Message…"
                  className="
                    flex-1
                    rounded-full
                    border
                    px-3 py-1
                    text-xs
                    focus:outline-none
                    focus:ring-1
                  "/>
                <button
                  className="
                    rounded-full
                    bg-blue-600
                    text-white
                    px-3 py-1
                    text-xs
                    hover:bg-blue-700
                  ">
                  Send
                </button>
              </div>
            }
          >
            {/* Messages */}
            <div className="space-y-2">
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-lg bg-white px-2 py-1 text-xs shadow-sm">
                  Hello 👋
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[75%] rounded-lg bg-blue-600 text-white px-2 py-1 text-xs">
                  Hey! What’s up?
                </div>
              </div>
            </div>
          </PanelCard>
        </div>
      </div>

    </div>
  );
};
export default App;

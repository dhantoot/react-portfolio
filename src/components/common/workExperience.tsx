import { memo } from 'react';
import { Component } from "lucide-react"

type WorkExperience = {
  id: number
  title: string
  organization: string
  dateStart: string
  dateEnd: string
  roles: string[]
}

type WorkExperienceProps = {
  workExperiences: WorkExperience[]
  expanded: boolean
}


const WorkExperience = (props: WorkExperienceProps) => {
  const {
    workExperiences,
    expanded
  } = props;

  console.log(props)

  return (
    <div className={`flex 
      flex-col 
      gap-2 
      ${!expanded ? 'md:max-h-[35vh]' : ''} 
      overflow-y-scroll 
      scrollbar 
      scrollbar-thumb-neutral-400 
      scrollbar-track-neutral-100 
      hover:scrollbar 
      hover:scrollbar-thumb-neutral-400 
      hover:scrollbar-track-neutral-100`
    }>

      {
        workExperiences.map((workExperience: WorkExperience) => {
          return (

            <section className="" key={workExperience.id}>
              <p className="text-xs font-medium underline">{ workExperience?.title }</p>
              <p className="text-xs font-semibold text-orange-800">{ workExperience?.organization }</p>
              <p className="text-xs font-light">{ workExperience?.dateStart } - { workExperience?.dateEnd }</p>
              <ul className="pl-4">
                {
                  workExperience?.roles.map((role) => {
                    return (
                      <li
                        key={role}
                        className="flex items-center gap-1 text-xs font-light"
                      >
                        <Component className="h-2 w-2 shrink-0" />
                        <span>{role}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </section>

          )
        })
      }

    </div>
  );
};
export default memo(WorkExperience);
// export default WorkExperience;

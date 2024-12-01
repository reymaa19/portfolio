import { skillSchema } from "@/lib/schemas";
import data from "@/data/skills.json";
import { SkillsIcon } from "@/components/Icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Projects() {
    const techstack = skillSchema.parse(data);

    return (
        <section className="flex flex-col gap-8">
            <div className="flex justify-between">
                <h2 className="title text-2xl sm:text-2xl">Tech Stack</h2>
            </div>
            <section className="flex flex-wrap justify-between">
                <TooltipProvider>
                    {Object.entries(techstack).map(([category, skills]) => (
                        <div key={category} className="flex flex-col gap-2 w-2/5 mb-8">
                            <h3 className="">{category}</h3>
                            <ul className="flex gap-2 flex-wrap max-w-full pl-2">
                                {skills.map((skill) => (
                                    <Tooltip key={skill.name}>
                                        <TooltipTrigger>
                                            <li className="mr-4">
                                                <SkillsIcon name={skill.name.toLowerCase()} />
                                            </li>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{skill.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </ul>
                        </div>
                    ))}
                </TooltipProvider>
            </section>
        </section>
    );
}

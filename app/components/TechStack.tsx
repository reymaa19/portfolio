import { skillSchema } from "@/lib/schemas";
import data from "@/data/skills.json";
import { SkillsIcon } from "@/components/Icon";

export default function Projects() {
    const techstack = skillSchema.parse(data);

    return (
        <section className="flex flex-col gap-8">
            <div className="flex justify-between">
                <h2 className="title text-2xl sm:text-3xl">Tech Stack</h2>
            </div>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(techstack).map(([category, skills]) => (
                    <div key={category} className="flex flex-col gap-4">
                        <h3>{category}</h3>
                        <ul className="flex gap-2">
                            {skills.map((skill) => (
                                <li key={skill.name}>
                                    <SkillsIcon name={skill.name.toLowerCase()} aria-hidden="true" className="size-5" />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
        </section>
    );
}

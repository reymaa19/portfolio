import data from "@/data/projects.json";
import LinkWithIcon from "@/components/LinkWithIcon";
import { projectSchema } from "@/lib/schemas";
import { ProjectCard } from "./ProjectCard";
import { ArrowRightIcon } from "lucide-react";

interface Props {
    limit?: number;
}

export default function Projects({ limit }: Props) {
    let projects = projectSchema.parse(data).projects;
    if (limit) {
        projects = projects.slice(0, limit);
    }

    return (
        <section className="flex flex-col gap-8">
            <div className="flex justify-between">
                <h2 className="title text-2xl sm:text-2xl">Projects</h2>
                <LinkWithIcon
                    href="/projects"
                    position="right"
                    icon={<ArrowRightIcon className="size-5" />}
                    text="view more"
                />
            </div>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {projects.map((project, id) => (
                    <ProjectCard key={id} project={project} />
                ))}
            </section>
        </section>
    );
}

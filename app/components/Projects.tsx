"use client";
import data from "@/data/projects.json";
import { projectSchema } from "@/lib/schemas";
import { ProjectCard } from "./ProjectCard";
import { ArrowRightIcon } from "lucide-react";
import { ModalBody, ModalContent, ModalProvider, ModalTrigger } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";

interface Props {
    limit?: number;
}

function Modal() {
    const projects = projectSchema.parse(data).projects;
    return (
        <ModalBody>
            <ModalContent>
                <div className="flex flex-col h-[calc(100vh-200px)] overflow-y-auto pr-4 gap-4">
                    {projects.map((project, id) => (
                        <ProjectCard key={`${id} ${project}`} project={project} className="h-[425]" />
                    ))}
                </div>
            </ModalContent>
        </ModalBody>
    );
}

export default function Projects({ limit }: Props) {
    let projects = projectSchema.parse(data).projects;
    if (limit) {
        projects = projects.slice(0, limit);
    }

    return (
        <ModalProvider>
            <Modal />
            <section className="flex flex-col gap-8">
                <div className="flex justify-between">
                    <h2 className="title text-2xl sm:text-2xl">Projects</h2>
                    <ModalTrigger>
                        <Button variant="ghost">
                            View more <ArrowRightIcon />
                        </Button>
                    </ModalTrigger>
                </div>
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {projects.map((project, id) => (
                        <ProjectCard key={id} project={project} />
                    ))}
                </section>
            </section>
        </ModalProvider>
    );
}

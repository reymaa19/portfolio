import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Project } from "@/lib/schemas";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import Icon from "./Icon";

interface Props {
    project: Project;
    className?: React.ComponentProps<"div">["className"];
}

export function ProjectCard({ project, className }: Props) {
    const { name, href, description, image, tags, links } = project;

    return (
        <Card className={`flex flex-col ${className}`}>
            <CardHeader>
                {image && (
                    <Link href={href || image} target="_blank">
                        <Image
                            src={image}
                            alt={name}
                            width={500}
                            height={300}
                            className="xl:h-auto h-40 w-full object-cover"
                        />
                    </Link>
                )}
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <CardTitle className="xl:text-xl">{name}</CardTitle>
                <Markdown className="prose max-w-full text-pretty text-sm text-muted-foreground dark:prose-invert xl:text-base">
                    {description}
                </Markdown>
            </CardContent>
            <CardFooter className="flex h-full flex-col items-start justify-between gap-4">
                {tags && tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {tags.map((tag) => (
                            <Badge key={tag} className="px-1 py-0 text-[10px] xl:text-sm xl:font-medium" variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
                {links && links.length > 0 && (
                    <div className="flex flex-row flex-wrap items-start gap-1">
                        {links.map((link, idx) => (
                            <Link href={link?.href} key={idx} target="_blank">
                                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px] xl:text-sm">
                                    <Icon name={link.icon} className="size-3 xl:size-4" />
                                    {link.name}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}

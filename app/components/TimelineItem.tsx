import { Experience } from "@/lib/schemas";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import Icon from "./Icon";

interface Props {
    experience: Experience;
}

export default function TimelineItem({ experience }: Props) {
    const { name, href, title, logo, start, end, description, links } = experience;

    return (
        <li className="relative ml-10 py-4">
            <Link
                href={href}
                target="_blank"
                className="absolute -left-16 top-4 flex items-center justify-center rounded-full bg-white"
            >
                <Avatar className="size-12 border">
                    <AvatarImage src={logo} alt={name} className="bg-background object-contain" />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
            </Link>
            <div className="flex flex-1 flex-col justify-start gap-1">
                {start && (
                    <time className="text-xs text-muted-foreground lg:text-sm">
                        <span>{start}</span>
                        <span>{" - "}</span>
                        <span>{end ? end : "Present"}</span>
                    </time>
                )}
                <h2 className="font-semibold leading-none lg:text-xl">{name}</h2>
                {title && <p className="text-sm text-muted-foreground lg:text-lg">{title}</p>}
                {description && (
                    <ul className="ml-4 list-outside list-disc">
                        {description.map((desc, i) => (
                            <li key={i} className="prose pr-8 text-sm dark:prose-invert lg:text-base">
                                {desc}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {links && links.length > 0 && (
                <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                    {links?.map((link, idx) => (
                        <Link href={link.href} key={idx} target="_blank">
                            <Badge key={idx} title={link.name} className="flex gap-2 lg:text-sm">
                                <Icon name={link.icon} aria-hidden="true" className="size-3 lg:size-4" />
                                {link.name}
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
        </li>
    );
}

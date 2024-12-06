import data from "@/data/socials.json";
import { socialSchema } from "@/lib/schemas";
import Icon from "@/components/Icon";

export default function Socials() {
    const socials = socialSchema.parse(data).socials;

    return (
        <section className="flex gap-6 lg:ml-16">
            {socials.map((item) => (
                <a
                    href={item.href}
                    key={item.name}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground"
                    rel="noopener noreferrer"
                    title={item.name}
                >
                    <span className="sr-only">{item.name}</span>
                    <Icon name={item.icon} aria-hidden="true" className="size-5 lg:size-6" />
                </a>
            ))}
        </section>
    );
}

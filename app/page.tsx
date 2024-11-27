import Headshots from "@/components/Headshots";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
    return (
        <main className="mt-8 flex flex-col gap-16 pb-16">
            <Headshots />
            <Experience />
            <Projects limit={2} />
        </main>
    );
}

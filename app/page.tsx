import Headshots from "@/components/Headshots";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";

export default function Home() {
    return (
        <main className="mt-8 flex flex-col gap-16 pb-16">
            <Headshots />
            <Experience />
            <Projects limit={2} />
            <TechStack />
            <h2>Contact Section</h2>
        </main>
    );
}

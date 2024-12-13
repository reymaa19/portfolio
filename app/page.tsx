import Headshots from "@/components/Headshots";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Contact from "@/components/ContactForm";

export default function Home() {
    return (
        <main className="mt-8 flex flex-col md:gap-16 gap-8 pb-16">
            <Headshots />
            <Experience />
            <Projects limit={6} />
            <TechStack />
            <Contact />
        </main>
    );
}

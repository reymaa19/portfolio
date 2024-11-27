import Link from "next/link";
// import ThemeToggle from "./ThemeToggle";

// <Link href="/resume.pdf" target="_blank">
//   <Button variant="outline">
//     <span className="font-semibold">Resume</span>
//     <FileDown className="ml-2 size-5" />
//   </Button>
// </Link>

export default function Header() {
    const navLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Projects",
            href: "/projects",
        },
        {
            name: "Resume",
            href: "/resume.pdf",
        },
        {
            name: "Contact",
            href: "/contact",
        },
    ];

    return (
        <header className="sticky top-0 z-50 bg-background/75 py-6 backdrop-blur-sm">
            <nav className="flex items-center justify-between">
                <ul className="flex gap-4 sm:gap-8">
                    {navLinks.map((nav, id) => (
                        <li key={id} className="link">
                            <Link href={nav.href} target={nav.name == "Resume" ? "_blank" : ""}>
                                {nav.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                {
                    // <div className="flex gap-0 sm:gap-4">
                    //     <ThemeToggle />
                    // </div>
                }
            </nav>
        </header>
    );
}

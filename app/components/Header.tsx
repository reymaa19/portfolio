"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
}: {
    setActive: (item: string) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
}) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative">
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
            >
                {item}
            </motion.p>
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                >
                    {active === item && (
                        <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2">
                            <motion.div
                                transition={transition}
                                layoutId="active" // layoutId ensures smooth animation
                                className="dark:bg-black backdrop-blur-sm rounded-md border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                            >
                                <motion.div
                                    layout // layout ensures smooth animation
                                    className="w-max h-full"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)} // resets the state
            className="relative border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-12 px-8 py-6"
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
    alt,
}: {
    title: string;
    description: string;
    href: string;
    src: string;
    alt: string;
}) => {
    return (
        <Link href={href}>
            <Image src={src} width={180} height={130} alt={alt} className="flex-shrink-0 rounded-3xl shadow-2xl" />
            <div>
                <h4 className="text-xl font-bold mb-1 text-black dark:text-white">{title}</h4>
                <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">{description}</p>
            </div>
        </Link>
    );
};

export const HoveredLink = ({ children, ...rest }: PropsWithChildren<LinkProps>) => {
    return (
        <Link {...rest} className="text-neutral-700 dark:text-neutral-200 hover:text-black ">
            {children}
        </Link>
    );
};

export default function Header() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="About">
                    <div className="block m-auto">
                        <ProductItem href="/" src="https://assets.aceternity.com/demos/algochurn.webp" alt="homepage" />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Projects" />
                <MenuItem setActive={setActive} active={active} item="Contact" />
            </Menu>
        </div>
    );
}

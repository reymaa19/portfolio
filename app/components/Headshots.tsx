"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Socials from "@/components/Socials";
import { FileDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = useCallback(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay, handleNext]);

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };
    return (
        <div className="max-w-sm md:max-w-4xl mx-auto antialiased px-4 md:px-8 lg:px-12 min-h-[336]">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20 z-0">
                <div>
                    <div className="relative h-80 w-full">
                        <AnimatePresence>
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.src}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: randomRotateY(),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 10 : -100,
                                        rotate: isActive(index) ? 0 : randomRotateY(),
                                        zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                                        y: isActive(index) ? [0, -40, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: randomRotateY(),
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    <Image
                                        src={testimonial.src}
                                        alt={testimonial.name}
                                        width={500}
                                        height={500}
                                        draggable={false}
                                        className="xl:h-[350] h-full w-full rounded-3xl object-cover object-center cursor-pointer"
                                        onClick={handleNext}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex justify-between flex-col py-4">
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <h1 className="text-3xl font-bold dark:text-white text-black">{testimonials[active].name}</h1>
                        <p className="text-lg mt-1 text-gray-500 dark:text-neutral-500">
                            {testimonials[active].designation}
                        </p>
                        <motion.div className="text-lg text-gray-500 mt-6 dark:text-neutral-300">
                            <div className="md:h-[140]">
                                {testimonials[active].quote.split(" ").map((word, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{
                                            filter: "blur(10px)",
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeInOut",
                                            delay: 0.02 * index,
                                        }}
                                        className="inline-block"
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </div>
                            <section className="mt-8 flex items-center gap-8">
                                <Link href="/resume.pdf" target="_blank">
                                    <Button>
                                        <span className="font-semibold">Resume </span>
                                        <FileDown className="ml-1 size-5 xl:size-7" />
                                    </Button>
                                </Link>
                                <Socials />
                            </section>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default function Headshots() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // or a loading spinner, or some other placeholder
    }

    const testimonials = [
        {
            quote: "A 23-year-old software developer from Canada 🇨🇦, ready to launch a career in the software industry.",
            name: "Reynald Maala",
            designation: "Software Developer",
            src: "/headshot.jpg",
        },
        {
            quote: "Lifelong learner and recent bootcamp graduate, eager to bring a fresh perspective and contribute to projects that make a real difference.",
            name: "Reynald Maala",
            designation: "Bootcamp Graduate",
            src: "/rrc.png",
        },
        {
            quote: "Passionate coach and basketball fan, driven by collaboration and team environments focused on growth and development.",
            name: "Reynald Maala",
            designation: "Basketball Coach",
            src: "/pga.jpg",
        },
    ];

    return (
        <div className="z-0 mt-10">
            <AnimatedTestimonials testimonials={testimonials} />
        </div>
    );
}

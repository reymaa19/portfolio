import dynamicIconImports from "lucide-react/dynamicIconImports";
import { z } from "zod";

export const ContactFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }).min(2, { message: "Must be at least 2 characters." }),
    email: z.string().min(1, { message: "Email is required." }).email("Invalid email."),
    message: z.string().min(1, { message: "Message is required." }),
});

const iconLink = z.object({
    name: z.string(),
    href: z.string().url(),
    icon: z.custom<keyof typeof dynamicIconImports>(),
});
export type IconLink = z.infer<typeof iconLink>;

const project = z.object({
    name: z.string(),
    description: z.string(),
    href: z.string().url().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    links: z.array(iconLink),
});
export type Project = z.infer<typeof project>;

const experience = z.object({
    name: z.string(),
    href: z.string(),
    title: z.string(),
    logo: z.string(),
    start: z.string(),
    end: z.string().optional(),
    description: z.array(z.string()).optional(),
    links: z.array(iconLink).optional(),
});
export type Experience = z.infer<typeof experience>;

const skill = z.object({
    name: z.string(),
    logo: z.string(),
});
export type Skill = z.infer<typeof skill>;

export const careerSchema = z.object({ career: z.array(experience) });
export const educationSchema = z.object({ education: z.array(experience) });
export const projectSchema = z.object({ projects: z.array(project) });
export const socialSchema = z.object({ socials: z.array(iconLink) });
export const skillSchema = z.object({
    Languages: z.array(skill),
    Frameworks: z.array(skill),
    Libraries: z.array(skill),
    Databases: z.array(skill),
    Tools: z.array(skill),
    APIs: z.array(skill),
    "Cloud Platforms": z.array(skill),
});

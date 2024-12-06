"use client";
import {
    FaJs,
    FaPython,
    FaHtml5,
    FaCss3Alt,
    FaSass,
    FaReact,
    FaNodeJs,
    FaGit,
    FaGithub,
    FaDocker,
    FaAws,
} from "react-icons/fa";
import {
    SiTypescript,
    SiNextdotjs,
    SiExpress,
    SiTailwindcss,
    SiMui,
    SiBootstrap,
    SiMysql,
    SiMicrosoftsqlserver,
    SiSqlite,
    SiAmazondynamodb,
    SiMongodb,
    SiJest,
    SiCypress,
    SiFigma,
    SiPostman,
    SiTwilio,
    SiJira,
    SiGraphql,
    SiAmazonapigateway,
    SiVite,
} from "react-icons/si";
import { IconType } from "react-icons";
import Image from "next/image";
import React, { useEffect, useState, FC } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends Omit<LucideProps, "ref"> {
    name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
    const [LucideIcon, setLucideIcon] = useState<React.ComponentType<LucideProps> | null>(null);

    useEffect(() => {
        const loadIcon = async () => {
            const { default: LoadedIcon } = await dynamicIconImports[name]();
            setLucideIcon(() => LoadedIcon);
        };

        loadIcon();
    }, [name]);

    if (!LucideIcon) {
        return <div style={{ background: "#ddd", width: 24, height: 24 }} />;
    }

    return <LucideIcon {...props} />;
};

export default React.memo(Icon, (prevProps, nextProps) => {
    return prevProps.name === nextProps.name && prevProps.className === nextProps.className;
});

const icons: Record<string, IconType> = {
    javascript: FaJs,
    typescript: SiTypescript,
    python: FaPython,
    sql: SiMysql,
    html: FaHtml5,
    css: FaCss3Alt,
    scss: FaSass,
    "next.js": SiNextdotjs,
    "node.js": FaNodeJs,
    "express.js": SiExpress,
    "tailwind css": SiTailwindcss,
    react: FaReact,
    "material ui": SiMui,
    bootstrap: SiBootstrap,
    mysql: SiMysql,
    "microsoft sql server": SiMicrosoftsqlserver,
    sqlite: SiSqlite,
    dynamodb: SiAmazondynamodb,
    mongodb: SiMongodb,
    git: FaGit,
    github: FaGithub,
    docker: FaDocker,
    jest: SiJest,
    cypress: SiCypress,
    figma: SiFigma,
    postman: SiPostman,
    twilio: SiTwilio,
    jira: SiJira,
    rest: SiAmazonapigateway,
    graphql: SiGraphql,
    "amazon web services": FaAws,
    vite: SiVite,
};

export const SkillsIcon: FC<{ name: string }> = ({ name }: { name: string }) => {
    if (name === "shadcn") return <Image src={`/${name}.png`} alt={name} width={20} height={20} className="size-8 lg:size-10" />;
    const IconComponent = icons[name];
    return <IconComponent className="size-8 lg:size-10" />;
};

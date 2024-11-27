"use client";
import React, { useEffect, useState } from "react";
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

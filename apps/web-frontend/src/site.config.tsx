import { RiDiscordFill, RiGithubFill } from '@remixicon/react'
import type { HeaderProps } from './components/Header';

export interface SiteConfig {
    meta: {
        title: string;
        description: string;
    };
    navigation: HeaderProps
    servers: {
        name: string;
        address: string;
        version: {
            min: string;
            max: string;
        };
        editions: ("java" | "bedrock")[];
        links: {
            title: string;
            href: string;
        }[];
    }[];
}

export const siteConfig: SiteConfig = {
    meta: {
        title: "Miners Online",
        description: "A friendly Minecraft SMP server",
    },
    navigation: {
        logo: {
            url: "/",
            src: "/favicon-256x256.png",
            alt: "Miners Online Logo",
            title: "Miners Online",
        },
        menu: [
            { title: "Home", url: "/" },
            {
                title: "Resources",
                url: "#",
                items: [
                    { title: "Documentation", url: "/docs" },
                    { title: "Getting Started", url: "/docs/getting-started" },
                    { title: "Server Rules", url: "/docs/rules" },
                ],
            },
            {
                title: "Community",
                url: "#",
                items: [
                    { title: "Discord", url: "https://discord.gg/aeRReEaNnm", description: "The official Miners Online Discord server" },
                    { title: "GitHub", url: "https://github.com/miners-online", description: "Our GitHub organisation" },
                ],
            }
        ],
    },
    servers: [
        {
            name: "Minigames (Under Construction)",
            address: "play.minersonline.uk",
            version: {
                min: "1.8",
                max: "26.1.2"
            },
            editions: ["java", "bedrock"],
            links: [
                { title: "About", href: "/servers/minigames" },
            ]
        },
        {
            name: "Survival",
            address: "survival.mc.minersonline.uk",
            version: {
                min: "1.8",
                max: "26.1.2"
            },
            editions: ["java", "bedrock"],
            links: [
                { title: "About", href: "/servers/survival" },
            ]
        },
        {
            name: "Modded Creative",
            address: "modded-creative.mc.minersonline.uk",
            version: {
                min: "1.21.1",
                max: "1.21.1"
            },
            editions: ["java"],
            links: [
                { title: "About", href: "/servers/modded-creative" },
                { title: "Modpack Guide", href: "#placeholder" },
            ]
        }
    ]
}
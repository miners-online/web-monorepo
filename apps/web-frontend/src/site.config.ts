import { RiDiscordFill, RiGithubFill } from '@remixicon/react'

export const siteConfig = {
    meta: {
        title: "Miners Online",
        description: "A friendly Minecraft SMP server",
    },
    topNavigation: [
        { name: "Home", href: "/" },
        { name: "Documentation", href: "/docs" },
        { name: "Getting Started", href: "/docs/getting-started" },
        { name: "Server Rules", href: "/docs/rules" },
    ],
    socials: [
        { title: "Discord", href: "https://discord.gg/aeRReEaNnm", icon: RiDiscordFill },
        { title: "GitHub", href: "https://github.com/miners-online", icon: RiGithubFill },
    ],
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
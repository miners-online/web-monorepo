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
}
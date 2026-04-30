import type { HeaderProps } from './components/Header';

export interface SiteConfig {
    meta: {
        title: string;
        description: string;
    };
    navigation: HeaderProps
}

export const siteConfig: SiteConfig = {
    meta: {
        title: "Miners Online",
        description: "A collection of Minecraft servers for players of all interests and skill levels, from casual builders to competitive minigamers. Join our friendly community and explore our diverse range of servers, including survival, creative, modded, and mini-games. Whether you're looking to collaborate on epic builds, compete in thrilling challenges, or simply hang out with fellow Minecraft enthusiasts, Miners Online has something for everyone. Join us today and start your adventure!",
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
                title: "Servers",
                url: "#",
                items: [
                    { title: "Minigames", url: "/servers/minigames", description: "Fun mini-games to play with friends, currently under construction" },
                    { title: "Survival", url: "/servers/survival", description: "Our classic survival server, compatible with the latest versions" },
                    { title: "Modded Creative", url: "/servers/modded-creative", description: "A Create mod focused creative server" },
                ],
            },
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
                    { title: "GitHub", url: "https://github.com/miners-online", description: "Find our source available projects on GitHub" },
                ],
            }
        ],
    },
}
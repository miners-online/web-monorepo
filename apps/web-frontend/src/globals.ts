interface SiteGlobals {
    meta: {
        siteName: string;
    };
    navigation: {
        title: string;
        url: string;
        icon: string;
    }[];
    announcement?: string;
    footer: {
        columns: {
            title: string;
            links: {
                title: string;
                url: string;
                icon: string;
            }[];
        }[];
    };
    authors: {
        [key: string]: {
            name: string;
            avatarUrl: string;
            url: string;
        };
    };
};

const globals: SiteGlobals = {
    meta: {
        siteName: "Miners Online",
    },
    navigation: [
        {
            title: "Home",
            url: "/",
            icon: "bi bi-house",
        },
        {
            title: "News",
            url: "/news",
            icon: "bi bi-newspaper",
        },
        {
            title: "Wiki",
            url: "/wiki",
            icon: "bi bi-book",
        }
    ],
    announcement: "Miners Online is currently in development. Check the latest news and updates!",
    footer: {
        columns: [
            {
                title: "Navigation",
                links: [
                    {
                        title: "Home",
                        url: "/",
                        icon: "bi bi-house",
                    },
                    {
                        title: "News",
                        url: "/news",
                        icon: "bi bi-newspaper",
                    },
                    {
                        title: "Wiki",
                        url: "/wiki",
                        icon: "bi bi-book",
                    }
                ]
            },
            {
                title: "Social",
                links: [
                    {
                        title: "Discord",
                        url: "https://discord.gg/aeRReEaNnm",
                        icon: "bi bi-discord",
                    },
                    {
                        title: "GitHub",
                        url: "https://github.com/minersonline",
                        icon: "bi bi-github",
                    }
                ]
            }
        ]
    },
    authors: {
        "samuelh2005": {
            name: "Samuel Hulme",
            avatarUrl: "https://avatars.githubusercontent.com/u/41990982?v=4",
            url: "https://github.com/samuelh2005",
        }
    }
};

export default globals;

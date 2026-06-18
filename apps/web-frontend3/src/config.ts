interface SiteConfig {
    theme: string
    title: string
    navigation: {
        icon: string
        name: string
        url: string
    }[]
}

const siteConfig: SiteConfig = {
    theme: "default",
    title: "Miners Online",
    navigation: []
}

export default siteConfig;

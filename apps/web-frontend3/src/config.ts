interface SiteConfig {
    title: string
    navigation: {
        icon: string
        name: string
        url: string
    }[]
}

const siteConfig: SiteConfig = {
    title: "Miners Online",
    navigation: []
}

export default siteConfig;

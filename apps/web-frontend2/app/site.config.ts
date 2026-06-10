export interface SiteConfig {
    authors: {
        [key: string]: { name: string; url: string, avatar?: string, description?: string }
    }
}

const siteConfig: SiteConfig = {
    authors: {
        "samuel-hulme": { name: "Samuel Hulme", url: "https://github.com/samuelh2005", avatar: "https://github.com/samuelh2005.png", description: "Founder of Miners Online" },
    }
}

export default siteConfig

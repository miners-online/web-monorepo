import path from 'node:path'
import { readFile } from 'node:fs/promises'
import { normalizeRoute } from './lib/url.js'
import { projectRoot, tryReadFile } from './lib/fs.js'
import ejs from 'ejs'
import siteConfig from './config.js'

const themesDir = path.join(projectRoot(), 'extensions', 'themes')

type ThemeConfig = {
    routes: {
        path: string
        template: string
    }[]
}

class Theme {
    constructor(private config: ThemeConfig, private themeDir: string) {}

    public getAssetsDir() {
        return path.join(this.themeDir, "assets")
    }

    public getTemplatesDir() {
        return path.join(this.themeDir, "templates")
    }

    public async renderRoute(rPath: string) {
        const input = normalizeRoute(rPath);
        let template = null;

        for (const element of this.config.routes) {
            const eRoute = normalizeRoute(element.path);
            if (eRoute == input) {
                template = element.template;
                break;
            }
        }

        if (template == null) {
            return null;
        }

        const templatePath = path.join(this.getTemplatesDir(), template);

        return await this.renderPage(templatePath);
    }

    private async renderPage(filePath: string) {
        const bytes = await tryReadFile(filePath)

        if (!bytes) {
            return null;
        }

        const html = ejs.render(bytes.toString('utf8'), {
            siteConfig: siteConfig
        });

        return html;        
    }
}

export async function loadTheme(theme: string): Promise<Theme> {
    const dir = path.join(themesDir, theme)
    const configPath = path.join(dir, 'config.json')

    const config = JSON.parse(
        await readFile(configPath, 'utf8')
    )

    return new Theme(config, dir);
}

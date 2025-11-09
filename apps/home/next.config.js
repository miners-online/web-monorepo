import path from 'path';
import { withContentCollections } from "@content-collections/next"

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, '..', '..', 'nodes_modules', '@carbon', 'react')],
    }
};

export default withContentCollections(nextConfig);

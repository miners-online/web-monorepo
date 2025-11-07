import { docs } from '@/.source';
import {
  type InferMetaType,
  type InferPageType,
  loader,
  multiple,
} from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { openapiPlugin, openapiSource } from 'fumadocs-openapi/server';
import { createMDXSource } from 'fumadocs-mdx/runtime/next';
import { blogPosts } from '@/.source';
import { authentication } from '@/lib/openapi';

// See https://fumadocs.dev/docs/headless/source-api for more info

export const source = loader(
  multiple({
    docs: docs.toFumadocsSource(),
    // authentication: await openapiSource(authentication, {
    //   baseDir: 'authentication/(generated)',
    // }),
  }),
  {
    baseUrl: '/docs',
    plugins: [lucideIconsPlugin(), openapiPlugin()],
  },
);

export const blog = loader({
  baseUrl: '/blog',
  source: createMDXSource(blogPosts),
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const data = page.data;
  if (data.type === "docs") {
    const processed = await data.getText('processed');

    return `# ${page.data.title} (${page.url})

  ${processed}`;
  }
}

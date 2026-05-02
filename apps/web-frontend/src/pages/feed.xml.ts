import { siteConfig } from '@/site.config';
import { type APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { Feed, type Author } from 'feed';

export const GET: APIRoute = async (context) => {
  const contentItems = await getCollection('content');
  // Filter for blog template items and sort by date
  const blogItems = contentItems
    .filter(item => item.data.template === 'blog')
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

  const feed = new Feed({
    title: 'Miners Online',
    description: 'Latest news and updates from Miners Online',
    id: (context.site!).href,
    link: (context.site!).href,
    language: 'en',
    favicon: `${context.site!}favicon-256x256.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  blogItems.forEach(item => {
    const categories = [
      ...((('topics' in item.data ? item.data.topics : []) || []).map(name => ({ name: `topic:${name}` }))),
      ...((item.data.tags || []).map(name => ({ name: `tag:${name}` }))),
    ];

    let authors: Author[] = [];
    if ('authors' in item.data && item.data.authors) {
      item.data.authors.forEach(id => {
        const authorData = siteConfig.blog.authors[id];
        authors.push({
          name: authorData.name,
          link: authorData.url,
        });
      });
    }

    feed.addItem({
      title: item.data.title,
      description: item.data.description,
      id: `${context.site}${item.id}`,
      link: `${context.site}${item.id}`,
      date: new Date(item.data.date),
      category: categories,
      author: authors.length > 0 ? authors : undefined,
    });
  });

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
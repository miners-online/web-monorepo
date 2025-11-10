import { notFound } from "next/navigation";
import { allBlogs } from "content-collections";
import BlogPostPage from "../../components/BlogPostPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = allBlogs.find((blog) => blog._meta.path === slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = allBlogs.find((blog) => blog._meta.path === slug);
  if (!post) {
    notFound();
  }
  return (
    <BlogPostPage post={{
      title: post.title,
      author: post.author,
      date: post.date.toDateString(),
      mdx: post.mdx,
    }}/>
  );
}
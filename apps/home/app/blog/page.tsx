import type { Metadata } from "next";
import { allBlogs } from "content-collections"

import BlogListPage from "../components/BlogListPage";

export const metadata: Metadata = {
  title: "All blog posts"
}

export default function Blog() {
  const articlesGroupedByMonth = allBlogs.reduce((groups, blog) => {
    const month = blog.date.toLocaleString("default", { year: "numeric", month: "long" });
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(blog);
    return groups;
  }, {} as Record<string, typeof allBlogs>);

  return (
    <BlogListPage posts={articlesGroupedByMonth} />
  )
}
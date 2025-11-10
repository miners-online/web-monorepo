"use client";

import { Grid, Column } from "@carbon/react"
import { MDXContent } from "@content-collections/mdx/react";
import Components from "./MDXComponents";

interface BlogPostPageProps {
  post: {
    title: string;
    author: string;
    date: string;
    mdx: string;
  };
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <Grid className="landing-page" fullWidth>
      <Column sm={4} md={8} lg={16} className="landing-page__banner">
      <h1>{post.title}</h1>
      <p>
        <em>
          By {post.author} on {post.date}
        </em>
      </p>
      </Column>
      <Column sm={4} md={8} lg={16}>
        <MDXContent
          code={post.mdx}
          components={Components}
        />
      </Column>
    </Grid>
  );
}
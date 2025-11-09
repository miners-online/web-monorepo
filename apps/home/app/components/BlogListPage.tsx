"use client"

import { allBlogs } from "content-collections"

import { Grid, Column } from "@carbon/react"

import C4DCardGroup from "@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group.js"
import C4DCardGroupItem from "@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item.js";
import C4DCardEyebrow from "@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow.js";
import C4DCardHeading from "@carbon/ibmdotcom-web-components/es/components-react/card/card-heading.js";
import C4DContentBlockCards from "@carbon/ibmdotcom-web-components/es/components-react/content-block-cards/content-block-cards.js";
import C4DContentBlockHeading from "@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading.js";
import C4DCardFooter from "@carbon/ibmdotcom-web-components/es/components-react/card/card-footer.js";

interface BlogPageProps {
  posts: Record<string, typeof allBlogs>
}

export default function BlogListPage(props: BlogPageProps) {
  return (
    <Grid className="landing-page" fullWidth>
      <Column sm={4} md={8} lg={16} className="landing-page__banner">
      <h1>Blog</h1>
      </Column>
      <Column sm={4} md={8} lg={16}>
        <ul>
          {Object.entries(props.posts).map(([month, blogs]) => (
            <C4DContentBlockCards key={month}>
              <C4DContentBlockHeading>{month}</C4DContentBlockHeading>
              <C4DCardGroup>
                {blogs.map((blog) => (
                  <C4DCardGroupItem
                    key={"blog/" + blog._meta.path}
                    href={"/blog/" + blog._meta.path}
                    cta-type="local"
                  >
                    <C4DCardEyebrow>{blog.category}</C4DCardEyebrow>
                    <C4DCardHeading>{blog.title}</C4DCardHeading>
                      <p>{blog.date.toDateString()}
                      
                    By {blog.author} </p>
                    <C4DCardFooter slot="footer"></C4DCardFooter>
                  </C4DCardGroupItem>
                ))}
              </C4DCardGroup>
            </C4DContentBlockCards>
          ))}
        </ul>
      </Column>
    </Grid>
  )
}
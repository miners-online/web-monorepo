import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import { blog } from '@/lib/source';
import { Button } from '@repo/ui/components/button';

export default function Home() {
  const posts = blog.getPages();

  return (
    <main className="grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post) => (
          <Link href={post.url} key={post.url}>
            <Card
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {post.data.category || "Uncategorised"}
                  </Badge>
                  {/* <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime}</span>
                  </div> */}
                </div>

                <CardTitle className="text-xl md:text-2xl leading-tight group-hover:text-primary transition-colors text-balance">
                  {post.data.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between gap-6">
                <CardDescription className="text-base leading-relaxed line-clamp-3">{post.data.description}</CardDescription>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <time dateTime={post.data.date.toISOString()}>{post.data.date.toDateString()}</time>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{post.data.author}</p>
                        {/* <p className="text-xs text-muted-foreground">{post.data.author.role}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
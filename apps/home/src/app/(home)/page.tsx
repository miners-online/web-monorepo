import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"

import { MinecraftServerStatus } from "@/components/minecraft-server-status";

import Link from "next/link";

export default function HomePage() {
  const sellingPoints = [
    {
      title: "Open Source & Transparent",
      body:
        "All server code and configuration are public. Read, learn, and contribute on GitHub. No hidden mechanics.",
    },
    {
      title: "Efficient & Sustainable",
      body:
        "Servers run primarily when players are active, focusing resources on quality—not idle uptime.",
    },
    {
      title: "Personal Community",
      body:
        "A small space where you can actually know other players. Your feedback influences development.",
    },
    {
      title: "Safe & Welcoming",
      body:
        "Focused on respectful interaction. A calm alternative to crowded, anonymous networks.",
    },
    {
      title: "Custom Features (Planned)",
      body:
        "Thoughtful mini-games (like Golf), cosmetic progression, and lightweight stats—built deliberately.",
    },
    {
      title: "Learn & Contribute",
      body:
        "Interested in server or plugin development? Follow along and participate through issues & discussions.",
    },
  ];

  return (
    // ...existing code...
    <div className="flex flex-col gap-24"> 
      {/* Hero */}
      <section className="text-center pt-12 md:pt-20">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            An Open Minecraft Mini-Game Project
          </h1>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            Miners Online is an open source Java Edition mini-game server—transparent and community-shaped.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/docs/core">
                Play Now
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/core/faq">
                FAQ
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/orgs/miners-online/discussions">
                Discussions
              </Link>
            </Button>
          </div>
          <div className="prose mt-10 inline-flex flex-col items-center gap-2 text-sm">
            <span className="uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Server Address
            </span>
            <code>
              play.minersonline.uk
            </code>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-10">
            Why Join Now?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { t: "Real Connections", d: "Recognize and remember people. Early members help define culture." },
              { t: "Your Voice Matters", d: "Ideas travel directly into development—not lost in a queue." },
              { t: "Passion Over Profit", d: "Built for learning and craft—not monetization funnels." }
            ].map(item => (
              <Card key={item.t}>
                <CardHeader>
                  <CardTitle>{item.t}</CardTitle>
                </CardHeader>
                <CardContent>
                  {item.d}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offering */}
      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-12">
            What We Offer (and Plan)
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sellingPoints.map(p => (
              <Card key={p.title}>
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {p.body}
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs mt-8 text-slate-500 dark:text-slate-500">
            Features evolve based on participation and feedback.
          </p>
        </div>
      </section>

      {/* Status placeholder */}
      <section className="px-4">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Server Status</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed prose">
            Our server may not always be online, check <Link href="/faq">the FAQ for reasons</Link>. Here&rsquo;s the current status:
          </p>
          <div className="flex justify-center">
            <MinecraftServerStatus
              serverAddress="play.minersonline.uk"
              refreshInterval={30000}
              forceOfflineWithMatchingMOTD="miners-online is currently not available.\nJoin to get notified when it's back online!"
            />
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Ready to Get Involved?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Read the rules, skim the FAQ, or join a discussion thread—early participation helps shape direction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/docs/core">
                Documentation
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/core/faq">
                FAQ
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/orgs/miners-online/discussions">
                Discussions
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    // ...existing code...
  );
}
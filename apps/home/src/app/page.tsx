"use client"

import { PageLayout } from "@primer/react"
import { Hero, Pillar, Stack, SectionIntroStacked } from "@primer/react-brand"
import { MegaphoneIcon, GitBranchIcon, LawIcon } from "@primer/octicons-react"

const hero = {
  heading: 'Welcome to Miners Online',
  description: 'Miners Online is an open source Java Edition mini-game server—transparent and community-shaped. Compatible with any Minecraft: Java Edition version through 1.8 to 1.21.8. Play now, using the IP address play.minersonline.uk.',
  primaryAction: {
    href: '/#play-now',
    text: 'Play Now',
  },
  secondaryActions: [
    {
      href: '/docs',
      text: 'Documentation',
    },
    {
      href: 'https://github.com/orgs/miners-online/discussions',
      text: 'Discussions',
    },
  ],
}

const playReasons = {
  title: 'Why play Miners Online?',
  items: [
    {
      icon: <GitBranchIcon />,
      heading: 'Real Connections',
      description: 'Recognise and remember people. Early members help define culture.',
    },
    {
      icon: <MegaphoneIcon />,
      heading: 'Your Voice Matters',
      description: 'Ideas travel directly into development—not lost in a queue.',
    },
    {
      icon: <LawIcon />,
      heading: 'Passion Over Profit',
      description: 'Built for learning and craft—not monetisation funnels.',
    },
  ]
}

const description = {
  heading: 'Miners Online is an open source Minecraft: Java Edition server in public alpha, designed for community-driven play and transparent development.',
  link: {
    href: '/docs',
    text: 'Learn More in the Docs',
  },
  items: [
    'Supports Java 1.8-1.21.8, allowing players from almost any Minecraft version to join.',
    'Community-driven development, where playtesting and contributor feedback shape gameplay systems and features.',
    'Open source transparency, with all code, discussions, and roadmap publicly available on GitHub.',
  ]
}

export default function HomePage() {
  return (
    <PageLayout>
      <PageLayout.Content>
        <Hero>
          <Hero.Heading>{hero.heading}</Hero.Heading>
          <Hero.Description>{hero.description}</Hero.Description>
          <Hero.PrimaryAction href={hero.primaryAction.href}>{hero.primaryAction.text}</Hero.PrimaryAction>
          {hero.secondaryActions.map((action) => (
            <Hero.SecondaryAction key={action.href} href={action.href}>{action.text}</Hero.SecondaryAction>
          ))}
        </Hero>

        <SectionIntroStacked>
          <SectionIntroStacked.Heading>
            {description.heading}
          </SectionIntroStacked.Heading>
          <SectionIntroStacked.Link href={description.link.href}>{description.link.text}</SectionIntroStacked.Link>
          <SectionIntroStacked.Items>
            {description.items.map((item, index) => (
              <SectionIntroStacked.Item key={index}>{item}</SectionIntroStacked.Item>
            ))}
          </SectionIntroStacked.Items>
        </SectionIntroStacked>

        <section>
          <h2>{playReasons.title}</h2>
          <Stack direction="horizontal" alignItems="center" justifyContent="center" gap="normal">
            {playReasons.items.map(({icon, heading, description}) => (
              <Pillar key={heading}>
                <Pillar.Icon icon={icon} color="blue" />
                <Pillar.Heading>{heading}</Pillar.Heading>
                <Pillar.Description>{description}</Pillar.Description>
              </Pillar>
            ))}
          </Stack>
        </section>
      </PageLayout.Content>
    </PageLayout>
  )
}
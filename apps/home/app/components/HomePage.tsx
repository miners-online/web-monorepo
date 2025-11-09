"use client";

import { Button, Column, Grid } from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";

import C4DLeadspaceBlock from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block.js';
import C4DLeadSpaceBlockContent from "@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-content.js";
import C4DLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading.js';
import C4DButtonGroup from "@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group.js";
import C4DContentBlock from "@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block.js";
import C4DContentBlockHeading from "@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading.js";
import C4DContentBlockParagraph from "@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-paragraph.js";
import C4DContentItemRow from "@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row.js";
import C4DContentItemHeading from "@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading.js";
import C4DContentItemRowCopy from "@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-copy.js";
import C4DContentBlockCopy from "@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy.js";
import C4DLinkList from "@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list.js";
import C4DLinkListItemCTA  from "@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta.js";

import { ExploreLinkList } from "./ExploreLinkList";

export default function HomePage() {
  return (
    <Grid className="landing-page" fullWidth>
      <Column sm={4} md={8} lg={16} className="landing-page__banner">
        <C4DLeadspaceBlock >
          <C4DLeadspaceHeading
            type-style="fluid-heading-05"
            highlight="open-source mini-game network"
          >
            Welcome to Miners Online, an <span>open-source</span> Minecraft: Java Edition <span>mini-game network</span>
          </C4DLeadspaceHeading>
          <C4DLeadSpaceBlockContent>
            <C4DContentBlockCopy>
              Dive into a community-driven Minecraft experience where every game is open-source, and every player can contribute to the adventure.
            </C4DContentBlockCopy>
            <ExploreLinkList/>
            <C4DButtonGroup>
              <Button renderIcon={ArrowRight} href="/docs/core/">
                Play Now
              </Button>
            </C4DButtonGroup>
          </C4DLeadSpaceBlockContent>
        </C4DLeadspaceBlock>
      </Column>
      <Column sm={4} md={8} lg={16}>
        <C4DContentBlock>
          <C4DContentBlockHeading>What is Miners Online</C4DContentBlockHeading>
          <C4DContentBlockParagraph>
            Miners Online is a community-built Minecraft network experimenting with new ways to create, connect, and play. Every game, system, and plugin is open to exploration - not just for players, but for anyone curious about how a Minecraft network works behind the scenes.
          </C4DContentBlockParagraph>
          <C4DContentBlockParagraph>
            Whether you're here to play, learn, or contribute, Miners Online welcomes you to be part of something different in the Minecraft universe.
          </C4DContentBlockParagraph>
        </C4DContentBlock>
      </Column>
      <Column sm={4} md={8} lg={16}>
        <C4DContentBlock>
          <C4DContentBlockHeading>What Makes Us Different?</C4DContentBlockHeading>
          <C4DContentItemRow>
            <C4DContentItemHeading>Open Development</C4DContentItemHeading>
            <C4DContentItemRowCopy>All code and assets live transparently on GitHub. Watch progress, report issues, or dive in and contribute.</C4DContentItemRowCopy>
            <C4DLinkList slot="footer" type="vertical">
              <C4DLinkListItemCTA
                icon-placement="right"
                href="https://github.com/miners-online"
                cta-type="external">
                Our GitHub Organisation
              </C4DLinkListItemCTA>
            </C4DLinkList>   
          </C4DContentItemRow>
          <C4DContentItemRow>
            <C4DContentItemHeading>Community-Driven (No Discord Needed)</C4DContentItemHeading>
            <C4DContentItemRowCopy>Have a say in the direction of the network through GitHub Discussions and Issues.</C4DContentItemRowCopy>
            <C4DLinkList slot="footer" type="vertical">
              <C4DLinkListItemCTA
                icon-placement="right"
                href="https://github.com/orgs/miners-online/discussions"
                cta-type="external">
                Join the Discussions
              </C4DLinkListItemCTA>
            </C4DLinkList>   
          </C4DContentItemRow>
          <C4DContentItemRow>
            <C4DContentItemHeading>Modern at the Core</C4DContentItemHeading>
            <C4DContentItemRowCopy>Built on Minestom + Velocity, fully containerised, and engineered to scale - even if the servers only run for short sessions.</C4DContentItemRowCopy>   
          </C4DContentItemRow>
          <C4DContentItemRow>
            <C4DContentItemHeading>Legacy Roots, Future Vision</C4DContentItemHeading>
            <C4DContentItemRowCopy><span>Originally founded in 2017 as the humble IP <code>81.110.170.100</code>, Miners Online is now in the middle of a complete rewrite - a new era for a project that never really stopped.</span></C4DContentItemRowCopy>   
          </C4DContentItemRow>
        </C4DContentBlock>
      </Column>
      <Column sm={4} md={8} lg={16}>
        <C4DContentBlock>
          <C4DContentBlockHeading>Why Join Miners Online?</C4DContentBlockHeading>
          <C4DContentBlockParagraph>
            By joining Miners Online, you're stepping into a world where your curiosity and creativity can thrive. Whether you're a player looking for fresh Minecraft experiences or a developer eager to explore open-source game development, Miners Online offers a unique platform to connect, learn, and grow.
          </C4DContentBlockParagraph>
          <C4DContentBlockParagraph>
            Embrace the freedom to explore new game modes, contribute to open-source projects, and be part of a community that values innovation and collaboration. Your journey in Miners Online is just beginning - come shape the future of Minecraft mini-games with us!
          </C4DContentBlockParagraph>
        </C4DContentBlock>
      </Column>
      <Column sm={4} md={8} lg={16}>
        <C4DContentBlock>
          <C4DContentBlockHeading>Get Involved</C4DContentBlockHeading>
          <C4DContentBlockParagraph>
            Ready to dive in? Whether you want to play, contribute code, or help shape the community, there are plenty of ways to get involved with Miners Online
          </C4DContentBlockParagraph>
          <C4DContentBlockParagraph>
            <Button renderIcon={ArrowRight} href="/docs/core" target="_self">
              Play Now
            </Button>
          </C4DContentBlockParagraph>
          <C4DContentBlockParagraph>
            <ExploreLinkList/>
          </C4DContentBlockParagraph>
          <C4DContentBlockParagraph>
            Your adventure in Miners Online awaits - let's build something amazing together.
          </C4DContentBlockParagraph>
        </C4DContentBlock>
      </Column>
    </Grid>
  );
}

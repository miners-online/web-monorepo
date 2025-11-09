"use client";

import C4DLinkList from "@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list.js";
import C4DLinkListHeading from "@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading.js";
import C4DLinkListItemCTA  from "@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta.js";

export function ExploreLinkList() {
  return (
    <C4DLinkList type="end">
      <C4DLinkListHeading>Explore Miners Online</C4DLinkListHeading>
      <C4DLinkListItemCTA href="/blog">
        Blog
      </C4DLinkListItemCTA> 
      <C4DLinkListItemCTA href="/docs/core">
        Documentation
      </C4DLinkListItemCTA>
      <C4DLinkListItemCTA href="/status">
        Live Status
      </C4DLinkListItemCTA> 
      <C4DLinkListItemCTA
        icon-placement="right"
        href="https://github.com/orgs/miners-online/discussions"
        cta-type="external"
      >
        Discussions
      </C4DLinkListItemCTA> 
    </C4DLinkList>
  )
}
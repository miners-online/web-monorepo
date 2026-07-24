---
title: "Snapshot 26.7: Internal server discovery and new temporary lobby"
description: "Snapshot 26.7 introduces internal server discovery and a new temporary lobby for Miners Online."
date: "2026-07-24"
authors:
  - name: "samuelh2005"
    to: "https://github.com/samuelh2005"
    avatar:
      src: "https://avatars.githubusercontent.com/u/41990982?v=4"
tags: ["lobby", "server-discovery"],
category: "changelog"
---

Today we are releasing Snapshot 26.7, which introduces a new update numbering scheme, internal server discovery, and a new temporary lobby for Miners Online.

## New Update Numbering Scheme

Our previous update numbering scheme was based on an incremental number, which was not very descriptive. We have now switched to a new scheme that uses the year and month of the release, followed by a minor version number. If we make multiple releases in a month we will include the day of the release as well. This will make it easier to understand when an update was released and what changes were made. The format is as follows: `snapshot-<year>.<month>.<day>`.

Examples:
- `snapshot-26.7` - First snapshot released in July 2026
- `snapshot-26.7.10` - Snapshot released on July 10, 2026
- `snapshot-26.7.24` - Snapshot released on July 24, 2026

## Internal Server Discovery

We have implemented a new internal server discovery system that allows game servers to locate each other through a central registry. This will allow for better server management and coordination.

This is implemented through a new independent open source project by samuelh2005 called [Server Announce](https://github.com/samuelh2005/ServerAnnounce) which provides the registry backend, and a server agent mod.

Whilst the current server registry is manually configured through a file, in the future the whole system will be expanded to allow for automatic server registration and proxy integration, allowing our future minigames to be part of the ecosystem.

## New Temporary Lobby

The lobby situation has been a long-standing issue for Miners Online, with players physically unable to join any server due to the lack of a lobby system. This has been holding back the growth of the community.

Backed by the new internal server discovery system, we have implemented a new temporary lobby for Miners Online. This lobby will allow players to choose which game server they want to join through a dialog GUI.

This is provided by the [Enhanced Lobby](https://github.com/samuelh2005/EnhancedLobby) mod by samuelh2005, which provides the /servers command and the dialog GUI.

Thanks to GeyserMC, it automatically translates the dialog GUI to Bedrock forms, allowing our Bedrock players to use the lobby as well.

This lobby GUI will become an integral part of our ecosystem in the future.

## In Conclusion

The introduction of internal server discovery and the new temporary lobby is a significant step forward for Miners Online, together they will allow for better server management and coordination, as well as providing a more seamless experience for players.

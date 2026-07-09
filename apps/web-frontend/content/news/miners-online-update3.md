---
title: "Miners Online Update 3: New architectural vision and Website v3"
description: "Miners Online has a new architectural vision and Website v3! See our new RPG experience, website design, and infrastructure changes."
date: "2026-06-23"
authors:
  - name: "samuelh2005"
    to: "https://github.com/samuelh2005"
    avatar:
      src: "https://avatars.githubusercontent.com/u/41990982?v=4"
tags: ["infrastructure", "website", "rpg"]
category: "changelog"
---

Between May 2026 and June 2026, we've been working on a new architectural vision for Miners Online, and Website v3. We've been working on a new RPG experience, a new website design, and infrastructure changes to improve the overall experience for players.

## Introducing the new Miners Online RPG experience

Planning for the future of Miners Online has been underway for a while, and we have decided to start development of a new RPG experience that will be available to all players, not just members.

This RPG will feature gameplay where players will travel to resource areas to extract, sell resources in town, and use the money to upgrade their equipment and abilities.

The goal is to create a unique and engaging experience that will appeal to both new and existing players rather then being just another mere survival experience.

We will be sharing more details about this new RPG experience in the coming months, so stay tuned for updates!

## Website v3

There were problems with Website v2, its design was very boring and it was not very welcoming to new players.

We've performed an experiment trying both [NamelessMC](https://namelessmc.com/) and [Azuriom](https://azuriom.com/) as a CMS, as we wanted a stronger community, but both were not suitable for our needs, they were too tightly coupled to Minecraft Java and did not allow us to have a clear account separation.

The final decision was that the Astro foundation of Website v2 was good, but the design was not. We have now redesigned the website using Bootstrap and taking visual inspiration from Azuriom but applying our own style.

The community systems we wanted would have to be different systems, that we still don't have.

## Infrastructure Changes

Miners Online has been running on Gate for the last month, and it has not been without its issues. [Gate](https://gate.minekube.com/) is a great proxy server, but it faces [issues with ViaVersion](https://github.com/search?q=repo%3Aminekube%2Fgate+author%3Asamuelh2005+version+OR+ViaFabric&type=issues) and has a smaller ecosystem of plugins compared to [Velocity](https://papermc.io/software/velocity/).

We have restored Velocity and recreated as many of the features we had on Gate as possible, we have not yet implemented dynamic MOTD or server links, but we will be working on that in the future.

In addition Fabric based backend servers were being experimented with, but have found a similar small ecosystem of server mods. The new RPG would be built on Paper instead.

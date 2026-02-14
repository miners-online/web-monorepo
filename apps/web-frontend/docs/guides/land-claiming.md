---
title: Land Claiming Guide
description: A guide on how to claim land in Miners Online
date: "2025-12-30"
tags: ['land', 'claiming', 'guide']
---

In Miners Online, players can claim land to protect their builds and resources from other players. This guide will walk you through the steps to successfully claim land using the Homestead plugin.

## Regions

Regions are areas of land that players can claim and manage. Each region has an owner who has full control over the land and can set permissions for other players.

Players can create multiple regions and doing so is encouraged to protect different areas of interest. There are multiple benefits to creating multiple regions:
- **Organised Management**: Different regions can be used for different purposes, such as residential areas, farms, or resource gathering zones.
- **Permission Control**: Players can set different permissions for each region, allowing them to control who can build, interact, or access specific areas.
- **Resource Allocation**: By dividing land into multiple regions, players can better manage resources and upkeep costs associated with each region.
- **Flexibility**: Players can easily expand or modify their land claims by creating new regions as needed without growing panhandles of existing regions. *In addition creating unreasonably shaped regions are a direct violation of the [Land & Property Rules](../rules#land--property-rules).*

More information on regions can be found in the [Homestead Documentation](https://tayebyassine.github.io/Homestead/).

## Creating a Region and Claiming Land

Creating a region does not claim land automatically. Players must first create a region and then claim land within that region.

Creating a region can be done with the following command:
> 1. Use the `/hs create <region_name>` command to create a new region.

To claim chunks, follow these steps:
> 1. Use the `/hs set target <region_name>` command to choose the region you want to work with.
> 2. Use the `/claim` command to claim the current chunk you are standing in for the selected region.
> 3. Use the `/unclaim` command to unclaim the current chunk you are standing in if needed.

## Region Metadata

Region metadata allows players to set additional information and settings for their regions. This includes setting the region's name and description, as well as other properties.

For all following commands, ensure you have the target region set using `/hs set target <region_name>`.

| Command | Description |
|---------|-------------|
| `/hs rename <new_name>` | Change the name of the target region. |
| `/hs set displayname <display_name>` | Set a custom display name for the target region. |
| `/hs set description <description>` | Set a description for the target region. |
| `/hs set spawn` | Set the spawn point for the target region to your current location. |

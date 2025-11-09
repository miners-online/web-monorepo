---
title: 'GitHub Horror Story: When Our Site Was Stolen in the Dark'
author: "Samuel Hulme"
date: 2024-10-28
category: Security
readTime: 5 min read
---

On October 27, 2024, the Miners Online website was compromised by an external entity associated with a foreign online casino, leading to the unauthorized takeover of our site.

Upon discovering that our website had been replaced, I immediately conducted an investigation. I checked Cloudflare for any malicious DNS records and reviewed our GitHub repository for unauthorized code. Fortunately, I found no indications of malicious activity. As a precaution, I updated our DNS records to redirect visitors to a temporary 404 page, which led to the creation of [Incident 76](https://status.minersonline.uk/incident/76).

![](./Screenshot_2024-10-28_192751.png)  

## How the Hacking Occurred

1. **Deletion of the CNAME File:** The GitHub Pages build process inadvertently deleted the `CNAME` file from the repository's `gh-pages` branch. This action resulted in GitHub unassigning our domain, leaving it vulnerable to external takeover.
   
2. **Repository Creation by Attacker:** The attacker created a new repository containing their website's code.

3. **Domain Binding:** The attacker linked the `minersonline.uk` domain to their repository.

4. **Redirect to Attacker's Site:** As a result, GitHub redirected the `minersonline.uk` domain to the attacker’s site.

## Resolution Steps

1. **Verifying Domain Ownership:** I verified our ownership of the domain within the GitHub organization's settings. This action resulted in GitHub unassigning the domain from the attacker's repository, effectively preventing further unauthorized access.

![](./Screenshot_2024-10-28_192523.png)  

2. **Reassignment of Domain:** Once the domain was unassigned from the attacker's repository, I was able to reassign our repository to the correct domain, restoring the website to its intended state.

## False assumptions

Initially, when GitHub instructed us to point our domain to GitHub Pages by creating a CNAME DNS record that directed to `miners-online.github.io`, I assumed that GitHub would verify our ownership of the domain. However, I later learned that `miners-online.github.io` functions merely as an alias to GitHub Pages’ generic distributed proxy and does not include a verification process for domain ownership, **which meant any repository with the `minersonline.uk` domain assigned would be assumed as the correct one by GitHub**.

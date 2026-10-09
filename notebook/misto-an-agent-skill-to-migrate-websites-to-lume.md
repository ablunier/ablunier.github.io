---
id: misto-an-agent-skill-to-migrate-websites-to-lume
lang: en
title: "Misto: an Agent Skill to migrate websites to Lume"
date: 2026-10-09
description: "How a command-line tool that wasn't enough ended up as a skill for AI agents, and how I used it to move suenosdecuarentena.com from Laravel to Lume."
tags: [notebook]
layout: layouts/post.tsx
---

During the 2020 lockdown, one day on a video call with my friend [Ayma](https://aymaraghiglione.com/) we ended up talking about dreams and how being confined might be influencing them. We came up with the idea of making [Sueños de cuarentena](https://suenosdecuarentena.com) (Quarantine Dreams), a dream bank to collect what people dreamed during that time, which we now remember almost as part of the dream world.

Back then we built it with Laravel, but keeping it that way, with everything it requires (PHP, a database, a server, updates) just to serve pages that won't change, is an unnecessary cost.

That's why I started thinking about turning it into a static site, and after [building my own website](/en/notebook/building-this-site-with-lume/), the thing that made the most sense was to do it with Lume.

The prospect of migrating it by hand didn't motivate me much, so instead of migrating it, and thinking that this is a situation that I or anyone else might face in the future, I decided to approach it by building a tool to migrate websites to Lume. That did motivate me.

## The first idea: a <abbr title="Command Line Interface">CLI</abbr>

The initial idea was a command-line tool: you give it a URL, it crawls the site and returns a Lume project ready to serve. A linear pipeline in four steps: crawl, extract the content of each page, download the assets and generate the project.

I got it working with suenosdecuarentena.com, but there was a catch: the website was mine, I knew the markup was reasonably semantic, and the tool was developed using this site as the test case. When I used it on other sites, things got complicated.

## The problems of a fixed pipeline

The problem is that every website has its own quirks, and almost all of them are **decisions**, not mechanical tasks.

With the CLI approach, every heuristic I added fixed one site and broke another. I was trying to automate a value judgment, and a fixed pipeline is too complex to program to cover every case.

I've done things like this in other content migrations, but in an ad hoc development for a specific migration you have control over what you find, it's a concrete and bounded context, and with good analysis and trial and error you end up solving every case. For a general-purpose tool there would always be unresolved or badly resolved cases.

## The change of approach: an Agent Skill

Instead of covering every possibility in a pipeline, I decided to give an AI agent the tools and the instructions to decide well. Misto became an [Agent Skill](https://agentskills.io).

In the skill you'll find:

```
SKILL.md
scripts/
├── crawl.ts
├── inspect.ts
├── download.ts
├── rewrite.ts
├── extract.ts
└── verify.ts
references/
├── lume.md
├── pitfalls.md
├── plugins.md
└── rules.md
assets/
```

Fundamentally, it works like this:

- **The scripts do the mechanical work:** crawl the site, download the assets, rewrite URLs, extract pages and check the result.
- **The agent does what changes with every website:** which pages share a template, where the content starts, what's worth keeping.
- **You decide what depends on you:** the agent asks which sections to migrate, what to do with analytics and third-party scripts, whether to download external fonts, etc. If something is important, include it in the agent's context.

And the three most important pieces are:

- **The scripts never decide:** `inspect.ts` gives hints (it groups pages by template, detects pagination and CMS leftovers), but it's the agent who checks them against real pages and chooses what to do.
- **`rules.json`:** You describe each template once (content selector, frontmatter fields) and `extract.ts` writes all of its pages. A `--dry-run` reports pages without a rule, without content or with URL collisions.
- **`verify.ts`:** It compares the built site with the crawled one and reports missing pages, text that differs from the original and broken links. While there are problems it exits with a non-zero code, so the agent knows it isn't done yet.

What used to be heuristics hidden in the code is now written knowledge, which the agent reads before deciding.

## Migrating suenosdecuarentena.com

I did two migrations.

In the first one I just asked the agent to migrate the website, with no further instructions. The result was good, but there was something I wanted to be different: the dreams. They had ended up as individual pages, and I wanted them to be data, in a JSON file.

In the second one I asked for it explicitly from the start, and the result was what I was after: the dreams live in `_data/dreams.json` and a single `dreams.page.ts` generates all the pages in both languages. The URLs it had in Laravel were kept (`/es/sueno/nr-{id}/`, `/gl/sono/nr-{id}/`).

In both cases, compared to the CLI, the migration was much better.

## What I've learned so far

- **For tasks that require a lot of judgment, an agent with good tools beats a fixed pipeline.** Fixed code is good for the mechanical and the bounded, and the judgment is better placed in the instructions.
- **The clearer you are about what you want, the better.** The first migration went well, but the structure of the dreams only came out the way I wanted when I explicitly asked for it.
- **It's not a one-step command.** It has to be a conversation, because the decisions can vary depending on the developer and the website.
- **Verifying that the text matches is not the same as verifying that the page looks right.** That's why the skill asks to open one page of each template before calling it good.
- **It has limits.** What only exists in JavaScript isn't seen by the crawler, and what depends on a server can't be migrated to static. The skill asks to flag this early.

---

Misto is still in an early stage, but it's already [available on GitHub](https://github.com/ablunier/misto). If you want to migrate a website to Lume, try it and let me know how it goes.

Clone the repository into your agent's skills folder and run:

> /misto https://yourwebsite.com

Expect a conversation, not a command: it crawls, shows you what it found, asks questions and builds the project.

If you also want to try it, the CLI is still available on [JSR](https://jsr.io/@ablunier/misto).

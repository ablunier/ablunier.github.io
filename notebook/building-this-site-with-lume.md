---
id: building-this-site-with-lume
lang: en
title: "Building this site with Lume"
date: 2026-04-15
description: "Why I chose a Deno-based static site generator and what the experience has been like."
tags: [notebook]
layout: layouts/post.tsx
---

I had been wanting to build my personal website for a while, and the premise I set for myself to succeed at this task was: **keep it simple, low cost (economical and ecological), and easy to maintain**. To meet these criteria, it was clear I needed to build it with an <abbr title="Static Site Generator">SSG</abbr>, and I had had [Lume](https://lume.land) on my radar for some time — a static site generator built on top of Deno.

## Why a static site, and why Lume

What a static website is and the reasons behind this architectural decision are very well explained [on this page](https://lume.land/docs/overview/why-static-sites/) in Lume's documentation.

When choosing among the [hundreds of generators](https://jamstack.org/generators/) available today, my first filter was being able to work in a TypeScript/JavaScript environment. TypeScript has been my main programming language for a while, so that condition was clear.
After researching the available options, the finalists were Lume, [Astro](https://astro.build/), and [Next.js](https://nextjs.org/), and I ended up choosing Lume for the following reasons:
* **Simplicity**. Without prior experience with either Astro or Lume, both seemed to have a gentle learning curve, with great flexibility and ease of configuration. I already knew Next.js, so I knew it was a more full-featured tool than I needed here, and it would lock me into using [React](https://react.dev/) — a commitment I didn't want to make at this early stage.
* **An opportunity to use Deno**. Setting aside performance comparisons — which for such a small project didn't feel like the most important factor — I wanted to work with a JavaScript runtime different from [Node.js](https://nodejs.org/), to take the opportunity to compare the experience beyond basic tests. I had already played a bit with [Deno](https://deno.com/) or [Bun](https://bun.com/), but nothing serious. The fact that Lume is already built for Deno gave me a good excuse.
* **It was made in Galicia by [Óscar Otero](https://oscarotero.com/)**. Óscar is a designer and developer I consider a reference in the tech ecosystem, and I was lucky enough to work with him a few years ago at A Navalla Suíza. Working with code he wrote has always been a pleasure.

## The decisions that followed

Once Lume was chosen, more design and architectural decisions came as I progressed through the project.

**Multilanguage.** I wanted the site to be available in multiple languages. Lume has a [multilanguage plugin](https://lume.land/plugins/multilanguage/) that makes this much easier, allowing you to define the languages of your site and associate equivalent content.

**TSX for templates.** Lume's default template engine is [Vento](https://vento.js.org/) and I started building the HTML and CSS base with it, but I ended up switching to TSX. Since I'm already familiar with TSX and Lume itself has [a plugin](https://lume.land/plugins/jsx/) to support it, it seemed like the most coherent and efficient option given my background. To honour the premise set at the beginning of the project, I also needed to reduce friction from unfamiliar tools where possible, and this was a good chance to leverage existing knowledge.

**CSS without frameworks, with LightningCSS.** I decided to have full control over my stylesheet and not depend on any framework to update over time. For CSS bundling and minification I chose the [LightningCSS plugin](https://lume.land/plugins/lightningcss/), which allows using modern CSS syntax and produces an optimised, compatible output.

**Deployment on GitHub Pages.** For hosting, [GitHub Pages](https://docs.github.com/pages) is a free and straightforward option. Since I already have the code repository on GitHub, integrating the build and deployment with GitHub Actions is simple and avoids adding a separate provider for deployment.

## Conclusions

The experience of building this site with Lume has been very positive. The learning curve is gentle, the documentation is good, and the plugin ecosystem covers most needs without forcing you to configure anything you don't want.

Working with Deno was also pleasant. The explicit permission management can feel a bit awkward at first, but it gives you more control and confidence over what your code is doing. The absence of `node_modules` and direct TypeScript compatibility without additional configuration are two advantages you notice from the very first moment.

In short, for building a simple website with TypeScript and a preference for modern, low-friction tools, Lume is an option I would recommend without hesitation.

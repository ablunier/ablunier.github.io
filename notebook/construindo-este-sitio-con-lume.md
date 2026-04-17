---
id: building-this-site-with-lume
lang: gl
title: "Construíndo esta web con Lume"
date: 2026-04-15
description: "Por que escollín un xerador de sitios estáticos baseado en Deno e como foi a experiencia."
tags: [notebook]
layout: layouts/post.tsx
---

Levaba tempo querendo crear a miña web persoal, e a premisa que me marquei para levar a cabo esta tarefa con éxito é: **simple, de custe reducido (económico e ecolóxico) e facilmente mantible**. Para cumplir con isto tiña claro que o que precisaba era desenvolvela cun <abbr title="Static Site Generator">SSG</abbr> e xa había tempo que tiña [Lume](https://lume.land) no radar, un xerador de sitios estáticos construído sobre Deno.

## Por que un sitio estático e con Lume

O que é unha web estática e os motivos para tomar esta decisión arquitectónica están moi ben expostos [nesta páxina](https://lume.land/docs/overview/why-static-sites/) da documentación de Lume.

Para escoller un dos [centos de xeradores](https://jamstack.org/generators/) que existen hoxe en día, o meu primeiro motivo de descarte era poder traballar nun entorno TypeScript/JavaScript. Levo un tempo facendo de TypeScript a miña linguaxe de programación principal, asique iso tíñao claro.
Despois de investigar un pouco as opcións dispoñibles, as finalistas foron Lume, [Astro](https://astro.build/) e [Next.js](https://nextjs.org/), e rematei escollendo Lume polos seguintes motivos:
* **Simplicidade**. Sen ter traballado previamente con Astro ou con Lume, pareceume que calquera dos dous podía ter unha curva de aprendizaxe suave, cunha gran flexibilidade e facilidade de configuración. Next.js xa o coñecía, polo tanto sabía que é unha ferramenta con máis posibilidades que non precisaba neste caso e establecíame o requerimento de usar [React](https://react.dev/), compromiso que neste punto prematuro non quería adquirir.
* **Unha oportunidade para usar Deno**. Sen fixarme en comparacións de rendemento, que para un proxecto tan pequeno non me parecía o motivo de maior peso, quería traballar cun entorno de execución de JavaScript diferente a [Node.js](https://nodejs.org/), por aproveitar a ocasión e comparar a experiencia máis alá de probas básicas. Tendo en conta os que máis o están *petando* a día de hoxe tiña que ser [Deno](https://deno.com/) ou [Bun](https://bun.com/). Que Lume xa estea feito para Deno dábame unha boa escusa.
* **Está feito en Galicia e por [Óscar Otero](https://oscarotero.com/)**. Óscar é un deseñador e desenvolvedor que considero referente no ecosistema técnico e co que tiven a sorte de traballar hai uns anos na Navalla Suíza. Traballar con código escrito por el sempre foi un pracer.

## As seguintes decisións que tomei

Unha vez escollido Lume, viñeron máis decisións de deseño e arquitectura que fun tomando a medida que avanzaba no proxecto.

**Multiidioma.** Quería que o sitio estivese en varias linguas. Lume ten un [plugin de multiidioma](https://lume.land/plugins/multilanguage/) que facilita moito esta tarefa, permitindo definir as linguas da túa web e asociar contidos equivalentes.

**TSX para as plantillas.** O motor de plantillas por defecto de Lume é [Vento](https://vento.js.org/) e comecei a montar a base de HTML e CSS con este, pero rematei pasándome a TSX. Dado que xa estou familiarizado con TSX e o propio Lume ten [un plugin](https://lume.land/plugins/jsx/) para darlle soporte, parecíame a opción máis coherente e rápida co meu contexto. Para respectar a premisa marcada ao inicio do proxecto tamén tiña que reducir a fricción de elementos novos onde fose posible e este era un bo punto de aproveitamento de coñecemento.

**CSS sen frameworks, con LightningCSS.** Decidín ter o control sobre o 100% da miña folla de estilos e non depender de ningún *framework* que actualizar co paso do tempo. Para o empaquetado e minificado do CSS escollín o [plugin de LightningCSS](https://lume.land/plugins/lightningcss/), que permite usar sintaxe CSS moderna e xera un resultado optimizado e compatible.

**Despregamento en GitHub Pages.** Para o aloxamento, [GitHub Pages](https://docs.github.com/pages) é unha opción gratuíta e das máis sinxelas. Como xa teño o repositorio de código en GitHub,  integrar a compilación e despregue con GitHub Actions é simple e evita engadir un provedor diferente para o despregamento.

## Conclusións

A experiencia de desenvolver este sitio con Lume foi moi positiva. A curva de aprendizaxe é suave, a documentación é boa e o ecosistema de plugins cobre a maioría das necesidades sen obrigarte a configurar nada que non queiras.

Traballar con Deno tamén foi agradable. A xestión de permisos explícita pode resultar algo incómoda ao principio, pero dáche máis control e seguridade sobre o que o código está facendo. A ausencia de `node_modules` e a compatibilidade directa con TypeScript sen configuración adicional son dúas vantaxes que se notan desde o primeiro momento.

En resumo, para montar unha web sinxela con TypeScript e preferencia por ferramentas modernas e con pouca fricción, Lume é unha opción que recomendaría sen dubidalo.

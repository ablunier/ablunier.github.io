---
id: misto-an-agent-skill-to-migrate-websites-to-lume
lang: gl
title: "Misto: unha «Agent Skill» para migrar webs a Lume"
date: 2026-10-09
description: "Como unha ferramenta de liña de comandos que non chegaba, rematou sendo unha habilidade para axentes de IA, e como a usei para pasar suenosdecuarentena.com de Laravel a Lume."
tags: [notebook]
layout: layouts/post.tsx
---

Durante o confinamento de 2020, houbo un día no que nunha videochamada coa miña amiga [Ayma](https://aymaraghiglione.com/) rematamos falando sobre soños e de como podía estar influíndo neles estar confinadas. Ocorréusenos facer [Soños de corentena](https://suenosdecuarentena.com), un banco de soños no que recoller o que a xente soñou durante esa época que agora lembramos case como parte do mundo onírico.

No seu momento desenvolvémola en Laravel, pero mantela así coas implicacións que require (PHP, base de datos, servidor, actualizacións) para servir páxinas que non van cambiar é un custo innecesario.

Por iso comecei a pensar en convertela nun sitio estático, e despois de [facer a miña propia web](/gl/notebook/construindo-este-sitio-con-lume/) o que máis sentido tiña era facelo con Lume.

A perspectiva de migrala a man non me motivaba moito, así que, en vez de migrala, e pensando que é unha situación á que nun futuro eu ou calquera outra persoa se pode enfrontar, decidín enfocalo desenvolvendo unha ferramenta para migrar webs a Lume. Isto sí que me motivaba.

## A primeira idea: unha <abbr title="Interface de Liña de Comandos">CLI</abbr>

A idea inicial era unha ferramenta de liña de comandos: dáslle unha URL, rastrexa o sitio e devolve un proxecto Lume listo para servir. Un <i>pipeline</i> lineal en catro pasos: rastrexar, extraer o contido de cada páxina, descargar os assets e xerar o proxecto.

Con suenosdecuarentena.com conseguín facela funcionar, pero tiña trampa: a web era miña, e eu sabía que o marcado era razoablemente semántico e a ferramenta foi desenvolvida con esta web como proba. Cando a a usei con outros sitios, a cousa complicouse.

## Os problemas dun <i>pipeline</i> fixo

O problema é que cada web ten as súas particularidades, e case todas son **decisións**, non tarefas mecánicas.

Co enfoque da CLI cada heurística que engadía arranxaba un sitio e rompía outro. Estaba intentando automatizar un xuízo de valor, e un <i>pipeline</i> fixo é demasiado complexo de programar para cubrir todos os casos.

Fixen cousas así noutras migracións de contidos, pero nun desenvolvemento ad hoc para unha migración concreta tes control sobre o que te atopas, é un contexto concreto e acotado e cunha boa análise e proba e erro acabas resolvendo todas as casuísticas. Para unha ferramenta xeneralista sempre ía haber casos sen resolver ou mal resoltos.

## O cambio de enfoque: unha <i>Agent Skill</i>

En vez de contemplar todas as posibilidades nun <i>pipeline</i>, decidín darlle a un axente de IA as ferramentas e as instrucións para decidir ben. Misto pasou a ser unha [<i>Agent Skill</i>](https://agentskills.io).

Na <i>skill</i> podes atopar:

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

O funcionamento fundamentalmente é:

- **Os scripts fan o mecánico:** rastrexar o sitio, descargar os assets, reescribir URLs, extraer páxinas e comprobar o resultado.
- **O axente fai o que cambia en cada web:** que páxinas comparten plantilla, onde empeza o contido, que merece a pena conservar.
- **Ti decides o que depende de ti:** o axente pregunta que seccións migrar, que facer coas analíticas e scripts de terceiros, se descargar as fontes externas, etc. Se hai algo importante inclúeo no contexto para o axente.

E as tres pezas máis importantes son:

- **Os scripts nunca deciden:** `inspect.ts` dá pistas (agrupa páxinas por plantilla, detecta paxinación e restos de CMS), pero é o axente quen as contrasta con páxinas reais e escolle que facer.
- **`rules.json`:** Describes cada plantilla unha soa vez (selector do contido, campos do <i>frontmatter</i>) e `extract.ts` escribe todas as súas páxinas. Un `--dry-run` informa de páxinas sen regra, sen contido ou con colisións de URL.
- **`verify.ts`:** Compara o sitio construído co rastrexado e informa de páxinas que faltan, texto que difire do orixinal e ligazóns rotas. Mentres haxa problemas sae cun código distinto de cero, así que o axente sabe que aínda non rematou.

O que antes eran heurísticas escondidas no código agora é coñecemento escrito, que o axente le antes de decidir.

## Migrando suenosdecuarentena.com

Fixen dúas migracións.

Na primeira limiteime a pedirlle ao axente que migrase a web, sen máis indicacións. O resultado foi bo, pero había algo que eu quería distinto: os soños. Quedaran como páxinas individuais, e eu quería que fosen datos, nun ficheiro JSON.

Na segunda pedínllo explicitamente desde o principio, e o resultado foi o que eu buscaba: os soños viven en `_data/dreams.json` e un único `dreams.page.ts` xera todas as páxinas nos dous idiomas. Mantivéronse as URLs que tiña en Laravel (`/es/sueno/nr-{id}/`, `/gl/sono/nr-{id}/`).

En ambos casos, e comparando coa CLI, a migración foi moito mellor.

## O que levo aprendido

- **Para tarefas con moito xuízo, un axente con boas ferramentas gaña a un <i>pipeline</i> fixo.** O código fixo vale para o mecánico e o acotado, e o criterio queda mellor nas instrucións.
- **Canto máis claro lle dis o que queres, mellor.** A primeira migración saíu ben, pero a estrutura dos soños só foi como a quería cando llo pedín explicitamente.
- **Non é un comando dun só paso.** Ten que ser unha conversa, porque as decisións poden variar segundo a persoa desenvolvedora e a web.
- **Verificar que o texto coincide non é verificar que a páxina se ve ben.** Por iso a <i>skill</i> pide abrir unha páxina de cada plantilla antes de dala por boa.
- **Ten límites.** O que só existe en JavaScript non o ve o rastrexador, e o que depende dun servidor non se pode migrar a estático. A <i>skill</i> pide avisalo cedo.

---

Misto aínda está en fase inicial, pero xa está [dispoñible en GitHub](https://github.com/ablunier/misto). Se queres migrar unha web a Lume, proba e cóntame que tal.

Clona o repositorio na carpeta de <i>skills</i> do teu axente e executa:

> /misto https://atuaweb.com

Agarda unha conversa, non un comando: rastrexa, ensínache o que atopou, fai preguntas e constrúe o proxecto.

Se tamén queres probala, a CLI segue dispoñible en [JSR](https://jsr.io/@ablunier/misto).

const initialThemeScript = `
  const match = document.cookie.match(/(?:^|; )theme=(dark|light)/);
  const theme = match?.[1] ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
`;

export default (
  {
    title,
    description,
    comp,
    children,
    lang,
    alternates,
    pageCss,
    i18n
  }: Lume.Data & { lang: string }
) => (
  <>
    {{ __html: "<!DOCTYPE html>" }}
    <html lang={lang}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{ title ? `${title} — ` : "" }Adrián Pardellas Blunier</title>
        {description && <meta name="description" content={description} />}
        <script>{ { __html: initialThemeScript } }</script>
        <link rel="stylesheet" href="/fonts/swiza/swiza.css" />
        <link rel="stylesheet" href="/global.css" />
        <link rel="stylesheet" href="/style.css" />
        {pageCss?.map((href: string) => <link key={href} rel="stylesheet" href={href} />)}
      </head>
      <body>
        <comp.Header lang={lang} alternates={alternates} i18n={i18n} />
        <main class="container">
          {children}
        </main>
        <comp.Footer madeWith={i18n[lang].made_with} />
        <script src="/script.js"></script>
      </body>
    </html>
  </>
);

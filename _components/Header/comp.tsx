export default ({ comp, search, lang, alternates, i18n }: Lume.Data & { lang: string }) => {
  const indexPage = search.page('id=index lang=' + lang);
  let notebookPage = search.page('id=notebook lang=' + lang);

  if (!notebookPage) {
    notebookPage = search.page('id=notebook lang=en');
  }

  return (
    <header class="site-header">
      <div class="site-header__container">
        <div class="site-header__overlay">
          <nav class="site-header__nav" aria-label={i18n[lang].primary_navigation}>
            <ul class="site-header__main-nav-list">
              <li>
                <a href={indexPage?.url}>{indexPage?.title}</a>
              </li>
              <li>
                <a href={notebookPage?.url}>{notebookPage?.title}</a>
              </li>
            </ul>
          </nav>

          {alternates && (
            <nav class="site-header__nav" aria-label={i18n[lang].lang_navigation}>
              <ul class="site-header__lang-list">
                {alternates.map((alt) => (
                  <li>
                    <a 
                      href={alt.url} 
                      aria-current={alt.lang === lang ? "page" : undefined}
                      class={alt.lang === lang ? "site-header__lang-link--active" : ""}
                      title={i18n[lang].language_name[alt.lang as string] || alt.lang}
                    >
                      {alt.lang}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div class="site-header__actions">
          <comp.ThemeToggler lang={lang} i18n={i18n} />

          <button type="button" class="site-header__menu-toggler" aria-expanded="false">
            <span class="sr-only">{i18n[lang].toggle_navigation}</span>
            <svg class="site-header__menu-icon" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <line class="site-header__menu-line site-header__menu-line-top" x1="5" y1="9" x2="19" y2="9" />
              <line class="site-header__menu-line site-header__menu-line-bottom" x1="5" y1="15" x2="19" y2="15" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

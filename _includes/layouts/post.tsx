export const layout = "layouts/main.tsx";
export const pageCss = ["/post.css"];

export default ({ search, lang, title, date, children }: Lume.Data, helpers: Lume.Helpers) => {
  const notebookPage = search.page('id=notebook lang=' + lang);

  return (
    <article class="post">
      <header class="post__header">
        {date && (
          <time class="post__date" dateTime={helpers.date(date)}>
            {helpers.date(date, "HUMAN_DATE", lang)}
          </time>
        )}
        <h1>{title}</h1>
      </header>
      <div class="post__content">
        {children}
      </div>
      <footer class="post__footer">
        <a href={notebookPage?.url} class="post__back-link">← {notebookPage?.title}</a>
      </footer>
    </article>
  );
};
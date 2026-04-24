export type Post = {
  title: string;
  date: Date;
  url: string;
  description?: string;
};

export default ({ post, lang }: { post: Post, lang: string }, helpers: Lume.Helpers) => (
  <li key={post.url}>
    <article class="post-summary">
      <a href={post.url} class="post-summary__link">
        <time class="post-summary__date" dateTime={helpers.date(post.date)}>
          {helpers.date(post.date, "HUMAN_DATE", lang)}
        </time>
        <h2 class="post-summary__title">{post.title}</h2>
        {post.description && (
          <p class="post-summary__description">{post.description}</p>
        )}
      </a>
    </article>
  </li>
)
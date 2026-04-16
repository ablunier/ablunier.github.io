export type Post = {
  title: string;
  date: Date;
  url: string;
  description?: string;
};

export default ({ post, lang }: { post: Post, lang: string }, helpers: Lume.Helpers) => (
  <li class="post-summary" key={post.url}>
    <a href={post.url} class="post-summary__link">
      <time class="post-summary__date" dateTime={helpers.date(post.date)}>
        {helpers.date(post.date, "HUMAN_DATE", lang)}
      </time>
      <h2>{post.title}</h2>
      {post.description && (
        <p class="post-summary__description">{post.description}</p>
      )}
    </a>
  </li>
)
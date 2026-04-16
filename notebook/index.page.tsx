import type { Post } from '../_components/Post/comp.tsx';

export const id = "notebook";
export const lang = ["en", "gl"];
export const layout = "layouts/main.tsx";
export const title = "Notebook";
export const description = "Thoughts, notes, and explorations.";

export const gl = {
  title: "Caderno",
  description: "Pensamentos, notas e exploracións."
};

export default ({ title, description, comp, search, lang }: Lume.Data) => {
  const posts = search.pages<Post>("notebook lang=" + lang, "date=desc");

  return (
    <>
      <header class="notebook-header">
        <h1>{title}</h1>
        <p class="notebook-header__subtitle">{description}</p>
      </header>
      <section>
        <ol class="post-list">
          {posts.map((post) => (
            <comp.Post post={post} lang={lang} />
          ))}
        </ol>
      </section>
    </>
  );
};

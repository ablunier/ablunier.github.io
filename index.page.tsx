export const id = "index";
export const lang = ["en", "gl"];
export const title = "About";
export const layout = "layouts/main.tsx";

export const gl = {
  title: "Sobre min",
};

export default ({ i18n, lang }: Lume.Data & { lang: string }) => (
  <>
    <article>
      <div class="homepage-lead">
        <h1
          dangerouslySetInnerHTML={{ __html: i18n[lang].greeting }}
        />
        <h2>
          {i18n[lang].role}
        </h2>
      </div>
    </article>
  </>
);

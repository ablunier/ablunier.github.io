export const id = "index";
export const lang = ["en", "gl"];
export const title = "About";
export const layout = "layouts/main.tsx";

export const gl = {
  title: "Sobre min",
};

export default ({ i18n, lang }: Lume.Data & { lang: string }) => (
  <>
    <section class="container">
      <div class="homepage-lead">
        <h1>
          {i18n[lang].greeting}
        </h1>
      </div>
    </section>
  </>
);

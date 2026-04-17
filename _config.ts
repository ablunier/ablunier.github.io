import lume from "lume/mod.ts";
import favicon from "lume/plugins/favicon.ts";
import redirects from "lume/plugins/redirects.ts";
import jsx from "lume/plugins/jsx.ts";
import esbuild from "lume/plugins/esbuild.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import date from "lume/plugins/date.ts";
import { gl } from "date-fns/locale/gl";
import { enGB as en } from "date-fns/locale/en-GB";
import multilanguage from "lume/plugins/multilanguage.ts";

const site = lume();

site.use(favicon())
    .use(redirects())
    .use(jsx())
    .use(esbuild())
    .use(lightningCss())
    .use(date({
      locales: { gl, en },
    }))
    .use(multilanguage({
      languages: ["gl", "en"],
    }));

site.copy("_redirect.html", "/index.html");

site.add("global.css")
    .add("post.css")
    .add("fonts");

export default site;

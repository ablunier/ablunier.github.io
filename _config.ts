import lume from "lume/mod.ts";
import redirects from "lume/plugins/redirects.ts";
import jsx from "lume/plugins/jsx.ts";
import esbuild from "lume/plugins/esbuild.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import date from "lume/plugins/date.ts";
import { gl } from "date-fns/locale/gl";
import { enGB as en } from "date-fns/locale/en-GB";
import multilanguage from "lume/plugins/multilanguage.ts";

const site = lume();

site.use(redirects());
site.use(jsx());
site.use(esbuild());
site.use(lightningCss());
site.use(date({
  locales: { gl, en },
}));
site.use(multilanguage({
  languages: ["gl", "en"],
}));

site.copy("_redirect.html", "/index.html");

site.add("global.css");
site.add("post.css");
site.add("fonts");

export default site;

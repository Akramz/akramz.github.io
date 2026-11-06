// Cloudflare Worker in front of GitHub Pages: serves Markdown to agents that send Accept: text/markdown.
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = env.ORIGIN ? new URL(url.pathname + url.search, env.ORIGIN) : url;
    const wantsMd = /text\/markdown/i.test(req.headers.get("Accept") || "");

    if (wantsMd && (req.method === "GET" || req.method === "HEAD")) {
      const path = url.pathname.endsWith("/") ? url.pathname + "index.md" : url.pathname.replace(/\.html$/, "") + ".md";
      const twin = await fetch(new URL(path, origin));
      if (twin.ok) return markdown(twin, 200);
    }

    const res = await fetch(new Request(origin, req));
    if (wantsMd && res.status === 404) return markdown(await fetch(new URL("/404.md", origin)), 404);
    const out = new Response(res.body, res);
    out.headers.append("Vary", "Accept");
    return out;
  },
};

function markdown(res, status) {
  return new Response(res.body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
      "Cache-Control": "public, max-age=600",
    },
  });
}

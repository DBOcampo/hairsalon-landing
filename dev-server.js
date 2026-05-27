const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const clients = new Set();

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const liveReloadScript = `
<script>
  (() => {
    const events = new EventSource("/__live-reload");
    events.onmessage = () => location.reload();
  })();
</script>`;

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
}

function safePath(urlPath) {
  const requested = urlPath === "/" ? "/index.html" : decodeURIComponent(urlPath);
  const filePath = path.normalize(path.join(root, requested));
  return filePath.startsWith(root) ? filePath : null;
}

const server = http.createServer((req, res) => {
  if (req.url === "/__live-reload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  const url = new URL(req.url, `http://localhost:${port}`);
  const filePath = safePath(url.pathname);

  if (!filePath) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found");
      return;
    }

    const ext = path.extname(filePath);
    const type = types[ext] || "application/octet-stream";

    if (ext === ".html") {
      const html = data.toString("utf8").replace("</body>", `${liveReloadScript}\n</body>`);
      send(res, 200, html, type);
      return;
    }

    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

let reloadTimer;
fs.watch(root, { recursive: true }, (_event, filename) => {
  if (!filename || filename.includes("node_modules")) return;
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    for (const client of clients) {
      client.write("data: reload\n\n");
    }
  }, 80);
});

server.listen(port, () => {
  console.log(`Live reload: http://localhost:${port}`);
});

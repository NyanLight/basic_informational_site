const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    "pages",
    req.url === "/" ? "index.html" : req.url
  );
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "pages", "404.html"),
          "utf8",
          (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          }
        );
      } else {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1> Server Error</h1>");
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(5050);

const express = require("express");

const server = express();

const actionRouter = require("./data/helpers/actionRouter.js");
const projectRouter = require("./data/helpers/projectRouter.js");

server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Hello</h2>`);
});

module.exports = server;

const express = require("express");
const app = express();
const port = 3000;
const main = require("./src/main");
const fs = require("fs");
const path = require("path");

app.use(express.json());
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//app.set("json spaces", 2);

app.get("/generate", (req, res) => {
  const json_compiler = fs.readFileSync(
    path.resolve(__dirname, "./src/compiler.json"),
    "utf-8"
  );

  let outputCompiler = JSON.parse(json_compiler);
  res.json(outputCompiler);
});

app.post("/input", function (req, res) {
  const inputCode = req.body;
  res.send(inputCode);
  main.main(inputCode);
});

//starting the server
app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});

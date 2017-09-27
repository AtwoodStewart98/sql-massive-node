const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const productsController = require("./products_controller");

const port = 3000;
const connectionString = `postgres://stewartatwood@localhost/SQLMassiveNode`;

const app = express();

app.use(bodyParser());
app.use(cors());

const massiveConnection = massive(connectionString)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => {
    console.log("You dun goofed");
  });

app.get("/api/products", productsController.getAll);
app.get("/api/product/:id", productsController.getOne);
app.put("/api/product/:id", productsController.update);
app.post("/api/product", productsController.create);
app.delete("/api/product/:id", productsController.deleter);

app.listen(port, () => {
  console.log(`Listening on Port:${port}`);
});

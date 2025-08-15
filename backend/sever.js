const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("assets"));

app.get("/api/products", (req, res) => {
  res.json({ message: "Product API endpoint" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

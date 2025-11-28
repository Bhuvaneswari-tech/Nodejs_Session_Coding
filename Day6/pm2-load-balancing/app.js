const express = require("express");
const app = express();

app.get("/products", (req, res) => {
  // Simulate delay
  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" },
    { id: 3, name: "Tablet" }
  ];
  setTimeout(() => res.json(products), 1000); // simulate I/O delay
});

app.listen(3002, () => console.log(`Server running on port 3002`));

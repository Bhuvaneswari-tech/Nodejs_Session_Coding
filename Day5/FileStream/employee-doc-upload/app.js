const express = require("express");
const uploadRoutes = require("./routes/upload.routes");

const app = express();

app.use("/upload", uploadRoutes);

app.listen(5011, () => console.log("Server running on 5011"));

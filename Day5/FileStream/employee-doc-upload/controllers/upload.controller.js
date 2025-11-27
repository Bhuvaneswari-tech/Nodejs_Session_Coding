// controllers/upload.controller.js
const fs = require('fs');
const path = require('path');

exports.uploadFile = (req, res) => {
  const fileName = req.query.name;

  if (!fileName) {
    return res.status(400).json({ error: "File name is required in ?name=" });
  }

  const filePath = path.join(__dirname, "../uploads", fileName);

  // Create a write stream
  const writeStream = fs.createWriteStream(filePath);

  req.pipe(writeStream);

  writeStream.on("finish", () => {
    res.json({
      message: "File uploaded successfully",
      file: fileName,
    });
  });

  writeStream.on("error", (err) => {
    console.error("Stream Error:", err);
    res.status(500).json({ error: "Stream processing failed" });
  });
};

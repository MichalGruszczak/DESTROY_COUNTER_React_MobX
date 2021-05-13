const express = require("express");

const app = express();
app.use(express.json());

app.use("/api", require("./API"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
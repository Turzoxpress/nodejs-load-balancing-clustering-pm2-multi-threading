const express = require("express");
const app = express();
const port = 3000;

app.get("/api/sum", (req, res) => {
  const maxValue = 100000000;
  let sum = 0;
  for (let i = 0; i < maxValue; i++) {
    sum = sum + i;
  }
  res.send(`Final sum is : ${sum}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

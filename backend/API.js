const express = require("express");
const router = express.Router();

let clickCount = 0;

router.patch("/v1/progress/:click_count", (req, res) => {
  clickCount = req.params.click_count;
  return res.json({ msg: "Click counter updated!" });
});

// in app - use probably with setInterval which updates totalPoints

// fetch(`<host>/api/v1/progress/${counterStore.totalPoints}`, {
//   method: "PATCH"
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

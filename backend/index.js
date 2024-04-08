const express = require("express");
const app = express();

const connectDB = require("./db/db");
const router = require("./routes/route");

const cors = require("cors");
const corsOption = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOption));

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Server Running Fine!");
});

connectDB();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

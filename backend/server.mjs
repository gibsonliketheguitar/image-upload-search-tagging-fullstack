import express from "express";
const app = express();

import compression from "compression";
import cors from "cors";
import helmet from "helmet";

app.use(compression()); // Compress all routes
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  //Get specific photo
  const { id } = req.query;
  res.status(200).send({ message: "hello world" });
});

app.post("/photo", (req, res) => {
  //update specific photo
  const { id } = req.query;
});

app.get("/photo", (req, res) => {
  //Get specific photo
  const { id } = req.query;
});

app.put("/photo", (req, res) => {
  //Get specific photo
  const { id } = req.query;
});

app.delete("/photo", (req, res) => {
  //Delete specific photo
  const { id } = req.query;
});

app.get("/photos", async (req, res) => {
  //GET ALL Compress thumbnails
});

app.delete("/photos", async (req, res) => {
  //DELETE all photos
});

//TODO configure client and server HTTP post

//listen for request on port 8000, and as a callback function have the port listened on logged//TODO FIX deployment port
const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
  if (err) console.log("Trouble with development server");
  console.log("HTTP Server listening on port", PORT);
});

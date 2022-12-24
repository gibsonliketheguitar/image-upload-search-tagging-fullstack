import express from "express";
import db from './db/index.mjs'
const app = express();

import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(compression()); // Compress all routes
app.use(cors());
app.use(helmet());

app.get("/", async (req, res) => {
  console.log('what is db', db)
  res.status(200).send({ message: "hello world" });
});

app.put("/photo", async (req, res) => {
  const { title: imgTitle, s3Key, tags } = req.body
  const client = await db()
  await client.connect()
  await client.query(`INSERT INTO "images" (title, s3Key) VALUES (${imgTitle},${s3Key.slice(0, -4)})`)

  const TAGS = tags.split(',')
  const INSERT_TAGS = []

  for (const tagTitle of TAGS) {
    INSERT_TAGS.push(`('${tagTitle}')`)
  }

  await client.query(`INSERT INTO "tags" (title) VALUES ${INSERT_TAGS.join(',')}`)

  res.status(200).send({ message: 'hi' })
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

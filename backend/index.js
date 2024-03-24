import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import pg from "pg";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const saltround = 10;
env.config();

app.use(express.json());
app.use(cors());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.post("/addnotes", async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const user_id = req.body.user_id;

    await db.query(
      "INSERT INTO notes(title, content, user_id) VALUES($1, $2, $3)",
      [title, content, user_id]
    );

    res.status(200).json({ message: "Note added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/getNotes", async (req, res) => {
  try {
    const user = req.body.user;
    const result = await db.query("SELECT * FROM notes WHERE user_id=$1", [
      user,
    ]);

    if (result.rowCount > 0) {
      res.status(200).json({ notes: result.rows });
    } else {
      res.status(404).json({ message: "No notes found for the user" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/deleteNotes", async (req, res) => {
  try {
    const notes_id = req.body.notes_id;
    const result = await db.query("DELETE FROM notes WHERE id = $1", [
      notes_id,
    ]);

    // Check if the note was deleted successfully
    if (result.rowCount > 0) {
      res.json({ message: "Note deleted successfully" });
    } else {
      res.json({ message: "Note not found" });
    }
  } catch (err) {
    res.json({ message: "Internal Server Error" });
  }
});

app.put("/updateNote", async (req, res) => {
  try {
    const { id, title, content } = req.body;

    await db.query("UPDATE notes SET title = $1, content = $2 WHERE id = $3", [
      title,
      content,
      id,
    ]);

    res.status(200).json({ message: "Note updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

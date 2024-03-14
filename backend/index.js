import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import pg from "pg";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
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

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname;
  try {
    const search = await db.query("Select email from Users where email = $1", [
      email,
    ]);

    if (search.rows.length > 0) {
      res.status(400).json({ error: " Email already registered please login" });
    } else {
      await db.query(
        "INSERT INTO Users(email, password, name) VALUES ($1, $2, $3)",
        [email, password, fullname]
      );
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const findUser = await db.query("Select * from Users where email = $1", [
    email,
  ]);
  if (findUser.rows.length < 0) {
    res.status(400).json({ error: "User not found" });
  } else {
    const user = findUser.rows[0];
    const storedPassword = user.password;
    if (password == storedPassword) {
    }
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

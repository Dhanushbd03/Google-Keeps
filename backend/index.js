import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";

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

// Regular expression for password pattern (at least 8 characters long, containing at least one letter and one digit)

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email pattern
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  try {
    // Check if email and password match the required patterns
    if (!emailRegex.test(email)) {
      return res.json({ error: "Email does not match the required pattern" });
    }
    if (!passwordRegex.test(password)) {
      return res.json({
        error:
          "Password does not match the required pattern (at least 8 characters long, containing at least one letter and one digit)",
      });
    }
    bcrypt.hash(password, saltround, async (err, hash) => {
      if (err) {
        console.log("unable to hash : " + err);
      } else {
        const search = await db.query(
          "Select email from Users where email = $1",
          [email]
        );

        if (search.rows.length > 0) {
          res.json({ error: " Email already registered please login" });
        } else {
          await db.query(
            "INSERT INTO Users(email, password, name) VALUES ($1, $2, $3)",
            [email, hash, fullname]
          );
          res.json({ success: true });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const findUser = await db.query("Select * from Users where email = $1", [
      email,
    ]);

    if (findUser.rows.length <= 0) {
      res.status(400).json({ error: "User not found" });
    } else {
      const user = findUser.rows[0];
      const storedPassword = user.password;
      const user_id = user.userid;
console.log(storedPassword);
      bcrypt.compare(password, storedPassword, (err, rev_hash) => {
        if (err) {
          console.log("error comparing:" + err);
        } else {
          if (rev_hash) {
            res.status(200).json({ success: true, userid: user_id });
          } else {
            res.status(400).json({ error: "Incorrect password" });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/notes", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const userid = req.body.userid;
  console.log(userid);

  await db.query(
    "insert into notes(title,content,user_id) values($1, $2, $3)",
    [title, content, userid]
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

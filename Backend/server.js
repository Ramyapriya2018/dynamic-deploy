const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)",
  );
});

app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/users", (req, res) => {
  const { name } = req.body;

  db.run("INSERT INTO users(name) VALUES(?)", [name], function () {
    res.json({ id: this.lastID, name });
  });
});
app.put("/users/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  db.run("UPDATE users SET name = ? WHERE id = ?", [name, id], function (err) {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json({ message: "User updated" });
  });
});
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json({ message: "User deleted" });
  });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

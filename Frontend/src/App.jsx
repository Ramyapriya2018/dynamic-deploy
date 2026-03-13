import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const loadUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Dynamic Website with Database</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      <button onClick={addUser}>Add User</button>

      <h2>Users</h2>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name}

            <button onClick={() => updateUser(u.id)}>Edit</button>

            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
const deleteUser = async (id) => {
  await fetch(`http://localhost:5000/users/${id}`, {
    method: "DELETE",
  });

  loadUsers();
};
const updateUser = async (id) => {
  const newName = prompt("Enter new name");

  await fetch(`http://localhost:5000/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  });

  loadUsers();
};

export default App;

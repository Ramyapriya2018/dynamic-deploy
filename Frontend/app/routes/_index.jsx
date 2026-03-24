import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = async () => {
    if (!name) return;

    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    loadUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    loadUsers();
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
  };

  const updateUser = async () => {
    await fetch(`/api/users/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setEditId(null);
    setName("");
    loadUsers();
  };

  // 🔍 Filter users
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>My App - CI/CD Test ✅</h1>
      <h2 style={{ marginBottom: 20 }}>👥 Users Management</h2>

      {/* Search */}
      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 8,
          width: 250,
          marginBottom: 20,
          borderRadius: 5,
          border: "1px solid #ccc",
        }}
      />

      {/* Add / Update */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          style={{
            padding: 8,
            marginRight: 10,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />

        {editId ? (
          <button onClick={updateUser} style={btnStyle("orange")}>
            Update
          </button>
        ) : (
          <button onClick={addUser} style={btnStyle("green")}>
            Add
          </button>
        )}
      </div>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "50%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th>Name</th>
            <th style={{ width: 150 }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>
                <button onClick={() => startEdit(u)} style={btnStyle("blue")}>
                  Edit
                </button>

                <button
                  onClick={() => deleteUser(u.id)}
                  style={btnStyle("red")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 🎨 Button styles
function btnStyle(color) {
  const colors = {
    green: "#28a745",
    red: "#dc3545",
    blue: "#007bff",
    orange: "#ff9800",
  };

  return {
    marginRight: 5,
    padding: "6px 10px",
    border: "none",
    borderRadius: 4,
    color: "white",
    backgroundColor: colors[color],
    cursor: "pointer",
  };
}

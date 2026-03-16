import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const res = await fetch(`${apiUrl}/users`);
  const users = await res.json();
  return users;
}
const apiUrl =
  typeof window === "undefined"
    ? "http://backend-api:8080"
    : "http://localhost:5000";

export default function Index() {
  const users = useLoaderData();

  return (
    <div>
      <h1>Remix Deployment Test</h1>

      {users.map((u) => (
        <p key={u.id}>{u.name}</p>
      ))}
    </div>
  );
}

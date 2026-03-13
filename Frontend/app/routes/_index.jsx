import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const res = await fetch("http://localhost:5083/users");
  const users = await res.json();
  return users;
}

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

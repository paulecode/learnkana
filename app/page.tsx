import isAuthenticated from "@/middleware/isAuthenticated";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  if (isAuthenticated()) {
    redirect("/home");
  }
  console.log(isAuthenticated());

  return (
    <div>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
}

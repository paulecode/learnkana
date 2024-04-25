import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  return (
    <form action={login}>
      <Card>
        <CardHeader>
          <CardTitle>Manabu</CardTitle>
          <CardDescription>Log in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="mannymarc" name="username" />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="•••••••"
            name="password"
          />
        </CardContent>
        <CardFooter>
          <Button variant="link">Register</Button>
          <Button type="submit">Login</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

const login = async (formData: FormData) => {
  "use server";
  const username = formData.get("username");
  const password = formData.get("password");

  const baseUrl = process.env.NEXT_PUBLIC_URL || "";

  const response = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    //TODO Handle this
    console.log(response);
    return;
  }

  const result = await response.json();

  const { token } = result;

  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
  });

  redirect("/home");
};

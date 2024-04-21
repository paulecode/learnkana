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
    <form action={register}>
      <Card>
        <CardHeader>
          <CardTitle>Manabu</CardTitle>
          <CardDescription>Sign Up</CardDescription>
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
          <Button variant="link">Login</Button>
          <Button type="submit">Register</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

const register = async (formData: FormData) => {
  "use server";
  const username = formData.get("username");
  const password = formData.get("password");

  const baseUrl = process.env.URL || "";

  const registerResponse = await fetch(`${baseUrl}/api/register`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!registerResponse.ok) {
    //TODO Handle this
  }

  const registerResult = await registerResponse.json();

  console.log(registerResult);

  const loginResponse = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!loginResponse.ok) {
    //TODO Handle this
  }

  const loginResult = await loginResponse.json();

  const { token } = loginResult;

  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
  });

  redirect("/home");
};

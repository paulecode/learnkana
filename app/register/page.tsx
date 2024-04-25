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
import { ArrowLeft } from "@carbon/icons-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function LoginPage() {
  return (
    <div className="grid h-screen place-content-center">
      <form action={register}>
        <Card className="flex w-fit flex-col gap-6 sm:w-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link href="/">
                <ArrowLeft />
              </Link>
              <p>Manabu</p>
            </CardTitle>
            <CardDescription>Sign Up</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="mannymarc" name="username" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="•••••••"
                name="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              <p>Register</p>
            </Button>
            <Link href="/login">
              <Button className="w-full" variant="link">
                <p>Login</p>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

const register = async (formData: FormData) => {
  "use server";
  const username = formData.get("username");
  const password = formData.get("password");

  const baseUrl = process.env.NEXT_PUBLIC_URL || "";

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

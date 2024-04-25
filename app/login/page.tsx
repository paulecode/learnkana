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
    <div className="grid h-screen place-content-center bg-gray-50">
      <form action={login}>
        <Card className="flex w-fit flex-col gap-6 shadow-xl sm:w-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link href="/">
                <ArrowLeft />
              </Link>
              <p>Manabu</p>
            </CardTitle>
            <CardDescription>Log in to your account</CardDescription>
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
              <p>Login</p>
            </Button>
            <Link href="/register">
              <Button className="w-full" variant="link">
                <p>Register</p>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
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

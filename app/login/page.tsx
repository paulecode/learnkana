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

export default function Login() {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Manabu</CardTitle>
          <CardDescription>Log in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="mannymarc" />
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="•••••••" />
        </CardContent>
        <CardFooter>
          <Button variant="link">Register</Button>
          <Button>Login</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

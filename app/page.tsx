import isAuthenticated from "@/middleware/isAuthenticated";
import { ArrowRight } from "@carbon/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  if (isAuthenticated()) {
    redirect("/home");
  }
  console.log(isAuthenticated());

  return (
    <div className="grid h-screen place-content-center gap-16 bg-gray-50">
      <div>
        <p className="heading-04">Kana</p>
        <p className="heading-03">Manabu</p>
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/login">
          <div className="buttonSquare">
            <p>Log in to your Account</p>
            <ArrowRight />
          </div>
        </Link>
        <Link href="/register">
          <div className="buttonSquare">
            <p>Create an account</p>
            <ArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
}

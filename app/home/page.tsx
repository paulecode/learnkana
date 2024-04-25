import { Button } from "@/components/ui/button";
import isAuthenticated from "@/middleware/isAuthenticated";
import { ArrowRight } from "@carbon/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function HomePage() {
  if (!isAuthenticated()) {
    redirect("/");
  }
  return (
    <div className="grid grow place-content-center bg-gray-50">
      <Link href="/home/hiragana">
        <div className="buttonSquare">
          <p>Practice Hiragana</p>
          <ArrowRight />
        </div>
      </Link>
    </div>
  );
}

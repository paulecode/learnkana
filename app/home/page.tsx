import isAuthenticated from "@/middleware/isAuthenticated";
import { ArrowRight } from "@carbon/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function HomePage() {
  if (!isAuthenticated()) {
    redirect("/");
  }
  return (
    <div className="grid grow place-content-center gap-4 bg-gray-50">
      <Link href="/home/hiragana">
        <div className="buttonSquare">
          <p>Practice Hiragana</p>
          <ArrowRight />
        </div>
      </Link>
      <Link href="/home/katakana">
        <div className="buttonSquare">
          <p>Practice Katakana</p>
          <ArrowRight />
        </div>
      </Link>
    </div>
  );
}

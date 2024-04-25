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
    <div>
      <Link href="/home/hiragana">Practice Hiragana</Link>
    </div>
  );
}

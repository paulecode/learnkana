import getToken from "@/middleware/getToken";
import isAuthenticated from "@/middleware/isAuthenticated";
import { KanaQuizChallenge } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function ResultPage() {
  const quizSession = await getQuizSession();
  return (
    <div>
      <p>Welcome to my resultpage</p>
      <div>{}</div>
    </div>
  );
}

const getQuizSession = async () => {
  if (!isAuthenticated()) {
    redirect("/");
  }

  const id = getToken();

  const baseUrl = process.env.NEXT_PUBLIC_URL || "";

  const response = await fetch(`${baseUrl}/api/getLatestQuizSession?id=${id}`);

  const result = await response.json();

  if (!result.ok) {
    console.log(result);
    throw new Error("Something went wrong");
  }

  console.log(result);

  // const { quizSession } = result;

  // return quizSession;
};

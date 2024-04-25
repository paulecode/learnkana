import { Button } from "@/components/ui/button";
import ResultTable from "@/compounds/ResultTable/ResultTable";
import getToken from "@/middleware/getToken";
import isAuthenticated from "@/middleware/isAuthenticated";
import { KanaQuizChallenge, Prisma } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

export type SelectedKanaQuizChallenge = Prisma.KanaQuizChallengeGetPayload<{
  select: { challenge: true; answer: true; givenAnswer: true; id: true };
}>;

export default async function ResultPage() {
  const {
    answers,
    totalAnswers,
    correctAnswers,
  }: {
    answers: SelectedKanaQuizChallenge[];
    totalAnswers: number;
    correctAnswers: number;
  } = await getQuizSession();

  return (
    <div>
      <p>Welcome to my resultpage</p>
      <p>
        {correctAnswers}/{totalAnswers}
      </p>
      <ResultTable results={answers} />
      <Button variant="link">
        <Link href="hiragana">Go back</Link>
      </Button>
    </div>
  );
}

const getQuizSession = async () => {
  if (!isAuthenticated()) {
    redirect("/");
  }

  const id = getToken();

  const baseUrl = process.env.NEXT_PUBLIC_URL || "";

  const response = await fetch(`${baseUrl}/api/getQuizResults?id=${id}`);

  if (!response.ok) {
    console.log(response);
    throw new Error("Something went wrong");
  }

  const result = await response.json();
  console.log(result);

  const { answers, totalAnswers, correctAnswers } = result;

  return { answers, totalAnswers, correctAnswers };
};

import { Button } from "@/components/ui/button";
import ResultTable from "@/compounds/ResultTable/ResultTable";
import getToken from "@/middleware/getToken";
import isAuthenticated from "@/middleware/isAuthenticated";
import { ArrowLeft } from "@carbon/icons-react";
import { Prisma } from "@prisma/client";
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
    <div className="flex grow flex-col bg-gray-50">
      <Button variant="link" className="self-start p-8">
        <Link href="/home/hiragana" className="flex items-center gap-2">
          <ArrowLeft />
          <p>Go back</p>
        </Link>
      </Button>
      <div className="grid place-content-center">
        <div className="flex flex-col gap-2 p-4">
          <p className="heading-02">Results</p>
          <div className="flex items-center gap-2">
            <p>Your score:</p>
            <p>
              {correctAnswers}/{totalAnswers}
            </p>
          </div>
        </div>
        <ResultTable results={answers} />
      </div>
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

  const { answers, totalAnswers, correctAnswers } = result;

  return { answers, totalAnswers, correctAnswers };
};

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuizForm from "@/compounds/QuizForm/QuizForm";
import getToken from "@/middleware/getToken";
import isAuthenticated from "@/middleware/isAuthenticated";
import { ArrowLeft } from "@carbon/icons-react";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";

export default async function PracticePage() {
  const { randomQuestion, unansweredCount, totalCount } =
    await loadQuizSession();
  return (
    <div className="flex grow flex-col justify-between bg-gray-50">
      <Button variant="link" className="self-start p-8">
        <Link href="/home" className="flex items-center gap-2">
          <ArrowLeft />
          <p>Go back</p>
        </Link>
      </Button>

      <QuizForm challenge={randomQuestion} serverAction={postAnswer} />
      <Progress
        value={Math.floor(((totalCount - unansweredCount) / totalCount) * 100)}
        className="mb-8 h-2 w-4/5 self-center sm:mb-16 sm:w-96"
      />
    </div>
  );
}

const loadQuizSession = async () => {
  if (!isAuthenticated()) {
    redirect("/");
  }

  const id = getToken();

  const baseUrl = process.env.NEXT_PUBLIC_URL || "";
  const response = await fetch(`${baseUrl}/api/getRandomQuestion?id=${id}`, {
    next: { tags: ["question"] },
  });

  if (!response.ok) {
    //TODO Handle this
    console.log("why");
    throw new Error("this should not happen");
  }

  const result = await response.json();

  const { randomQuestion, unansweredCount, totalCount } = result;

  console.log(totalCount);
  console.log(unansweredCount);
  console.log(Math.floor((totalCount - unansweredCount) / totalCount) * 100);

  if (unansweredCount == 0) {
    redirect("/home/practice/result", "push" as RedirectType);
  }

  return { randomQuestion, unansweredCount, totalCount };
};

const postAnswer = async (_: any, formData: FormData) => {
  "use server";

  const answer = formData.get("answer");
  const answerId = formData.get("answerId");

  console.log({ answer });

  const baseUrl = process.env.NEXT_PUBLIC_URL || "";
  const response = await fetch(`${baseUrl}/api/postAnswer`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answerId, answer }),
  });

  const { isCorrect, correctAnswer } = await response.json();

  revalidateTag("question");
  return { isCorrect, correctAnswer };
};

import { Button } from "@/components/ui/button";
import QuizForm from "@/compounds/QuizForm/QuizForm";
import getToken from "@/middleware/getToken";
import isAuthenticated from "@/middleware/isAuthenticated";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";

export default async function PracticePage() {
  const randomQuestion = await loadQuizSession();
  return (
    <div>
      <Button variant="link">
        <Link href="/home/hiragana">Go back</Link>
      </Button>
      <p>Practice Page</p>
      <QuizForm challenge={randomQuestion} serverAction={postAnswer} />
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

  console.log(unansweredCount);

  if (unansweredCount == 0) {
    redirect("/home/practice/result", "push" as RedirectType);
  }

  return randomQuestion;
};

const postAnswer = async (prevState: any, formData: FormData) => {
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

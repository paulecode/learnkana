import QuizForm from "@/compounds/QuizForm/QuizForm";
import getToken from "@/middleware/getToken";
import isAuthenticated from "@/middleware/isAuthenticated";
import { RedirectType, redirect } from "next/navigation";

export default async function PracticePage() {
  const randomQuestion = await loadQuizSession();
  return (
    <div>
      <p>Practice Page</p>
      <QuizForm challenge={randomQuestion} />
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

import { Button } from "@/components/ui/button";
import { KanaQuizChallenge } from "@prisma/client";
import { revalidateTag } from "next/cache";

const QuizForm: React.FC<{ challenge: Omit<KanaQuizChallenge, "answer"> }> = ({
  challenge,
}) => {
  return (
    <div>
      <p>Question</p>
      <div>{challenge.challenge}</div>
      <form action={postAnswer}>
        {challenge.options.map((option) => {
          return (
            <Button name="answer" value={option} variant="outline" key={option}>
              {option}
            </Button>
          );
        })}
        <input type="hidden" name="answerId" value={challenge.id} />
      </form>
    </div>
  );
};

const postAnswer = async (formData: FormData) => {
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

  console.log(isCorrect);
  console.log(correctAnswer);

  // await new Promise((resolve) => setTimeout(resolve, 3000));
  revalidateTag("question");
};

export default QuizForm;

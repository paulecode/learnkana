"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { KanaQuizChallenge } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const QuizForm: React.FC<{
  challenge: Omit<KanaQuizChallenge, "answer">;
  serverAction: any;
}> = ({ challenge, serverAction }) => {
  const { toast } = useToast();
  const [state, formAction] = useFormState(serverAction, {
    isCorrect: false,
    correctAnswer: "",
  });

  const { isCorrect, correctAnswer } = state;
  useEffect(() => {
    const title = isCorrect ? "Correct!" : "Incorrect";
    toast({
      title,
      variant: isCorrect ? "default" : "destructive",
    });
  }, [isCorrect, correctAnswer, toast]);

  console.log(state);
  return (
    <div>
      <p>Question</p>
      <div>{challenge.challenge}</div>
      <form action={formAction}>
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

export default QuizForm;

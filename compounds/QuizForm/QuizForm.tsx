"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { KanaQuizChallenge } from "@prisma/client";
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
    const title = isCorrect ? "Correct!" : "Incorrect!";
    toast({
      title,
      variant: isCorrect ? "default" : "destructive",
    });
  }, [isCorrect, correctAnswer, toast]);

  console.log(state);
  return (
    <div className="grid place-content-center gap-32">
      <div className="grid h-32 w-32 place-content-center justify-self-center p-4 text-9xl font-medium">
        {challenge.challenge}
      </div>
      <form action={formAction} className="grid grid-cols-2 grid-rows-2 gap-6">
        {challenge.options.map((option) => {
          return (
            <button
              className="h-32 w-32 rounded-sm bg-gray-800 shadow  transition ease-in-out hover:bg-black active:shadow-2xl"
              name="answer"
              value={option}
              key={option}
            >
              <p className="text-4xl font-semibold text-white opacity-100">
                {option}
              </p>
            </button>
          );
        })}
        <input type="hidden" name="answerId" value={challenge.id} />
      </form>
    </div>
  );
};

export default QuizForm;

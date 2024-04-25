import { SelectedKanaQuizChallenge } from "@/app/home/practice/result/page";
import { Checkmark, CircleStroke } from "@carbon/icons-react";

const ResultRow: React.FC<{ challenge: SelectedKanaQuizChallenge }> = ({
  challenge,
}) => {
  const { challenge: question, givenAnswer, answer } = challenge;

  const isCorrect: boolean = answer == givenAnswer;
  console.log(isCorrect);

  return (
    <div className="col-span-full grid grid-cols-subgrid items-center justify-items-center py-2 ring-gray-200 odd:bg-gray-100 hover:bg-gray-800 hover:text-white hover:ring-1">
      <p>{question}</p>
      <p>{givenAnswer}</p>
      <p>{answer}</p>
      {isCorrect ? (
        <Checkmark className="mx-4 h-6 w-6 justify-self-start text-green-600" />
      ) : (
        <CircleStroke className="mx-4 h-6 w-6 justify-self-start text-red-600" />
      )}
    </div>
  );
};

export default ResultRow;

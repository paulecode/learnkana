import { SelectedKanaQuizChallenge } from "@/app/home/practice/result/page";

const ResultRow: React.FC<{ challenge: SelectedKanaQuizChallenge }> = ({
  challenge,
}) => {
  const { challenge: question, givenAnswer, answer } = challenge;

  const isCorrect: boolean = answer == givenAnswer;
  console.log(isCorrect);

  return (
    <div className={isCorrect ? "bg-green-400" : "bg-red-400"}>
      <p>Question</p>
      <p>{question}</p>
      <p>Your answer</p>
      <p>{givenAnswer}</p>
      <p>Correct answer</p>
      <p>{answer}</p>
    </div>
  );
};

export default ResultRow;

import { SelectedKanaQuizChallenge } from "@/app/home/practice/result/page";
import ResultRow from "./ResultRow";

const ResultTable: React.FC<{ results: SelectedKanaQuizChallenge[] }> = ({
  results,
}) => {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_min-content] gap-4">
      <div className="col-span-full grid grid-cols-subgrid justify-items-center">
        <p className="heading-01">Question</p>
        <p className="heading-01">Your Answer</p>
        <p className="heading-01">Correct Answer</p>
      </div>
      <div className="col-span-full grid grid-cols-subgrid">
        {results.map((result) => {
          return <ResultRow challenge={result} key={result.id} />;
        })}
      </div>
    </div>
  );
};

export default ResultTable;

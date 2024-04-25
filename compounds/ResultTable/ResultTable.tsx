import { SelectedKanaQuizChallenge } from "@/app/home/practice/result/page";
import ResultRow from "./ResultRow";

const ResultTable: React.FC<{ results: SelectedKanaQuizChallenge[] }> = ({
  results,
}) => {
  return (
    <div>
      <p>Results</p>
      <div>
        {results.map((result) => {
          return <ResultRow challenge={result} key={result.id} />;
        })}
      </div>
    </div>
  );
};

export default ResultTable;

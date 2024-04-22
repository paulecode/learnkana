import getToken from "@/middleware/getToken";
import isAuthenticated from "@/middleware/isAuthenticated";
import { redirect } from "next/navigation";

export default async function PracticePage() {
  const challenges = await loadQuizSession();
  return (
    <div>
      <p>Practice Page</p>
    </div>
  );
}

const loadQuizSession = async () => {
  if (!isAuthenticated()) {
    redirect("/");
  }

  const id = getToken();

  const baseUrl = process.env.URL || "";
  const response = await fetch(`${baseUrl}/api/getQuizSession?id=${id}`);

  if (!response.ok) {
    //TODO Handle this
    console.log("why");
    throw new Error("this should not happen");
  }

  // const { challenges } = response.quiz;
};

import { Button } from "@/components/ui/button";
import getToken from "@/middleware/getToken";
import isAuthenticated from "@/middleware/isAuthenticated";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

type KanaGroupWithCharacter = Prisma.KanaGroupGetPayload<{
  include: { characters: true };
}>;

const KanaTable: React.FC<{ groups: KanaGroupWithCharacter[] }> = async ({
  groups,
}) => {
  return (
    <form action={requestQuizSession}>
      {groups.map((group) => {
        return (
          <div key={group.id}>
            <p>{group.name}</p>
            {group.characters.map((character) => {
              return (
                <div className="inline" key={character.id}>
                  {character.kana}
                </div>
              );
            })}
            <Button name="group" value={group.id}>
              Practice
            </Button>
          </div>
        );
      })}
    </form>
  );
};

const requestQuizSession = async (formData: FormData) => {
  "use server";
  if (!isAuthenticated) {
    redirect("/");
  }
  const id = getToken();

  const group = formData.get("group");

  const baseUrl = process.env.URL || "";
  const response = await fetch(`${baseUrl}/api/createQuizSession`, {
    method: "POST",
    body: JSON.stringify({ id, group }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    //TODO: Handle this
    console.log("why");
  }

  // redirect("/practice");
};
export default KanaTable;

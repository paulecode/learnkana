import { Button } from "@/components/ui/button";
import getToken from "@/middleware/getToken";
import isAuthenticated from "@/middleware/isAuthenticated";
import { Character, Prisma } from "@prisma/client";
import { RedirectType, redirect } from "next/navigation";

type KanaGroupWithCharacter = Prisma.KanaGroupGetPayload<{
  include: { characters: true };
}>;

const KanaTable: React.FC<{ groups: KanaGroupWithCharacter[] }> = async ({
  groups,
}) => {
  return (
    <form action={requestQuizSession} className="grid grid-cols-10">
      {groups.map((group) => {
        return <KanaRow kanaGroup={group} key={group.id} />;
      })}
    </form>
  );
};

const KanaRow: React.FC<{ kanaGroup: KanaGroupWithCharacter }> = ({
  kanaGroup,
}) => {
  return (
    <button key={kanaGroup.id} name="group" value={kanaGroup.id} className="">
      <div className="col-span-full flex h-full flex-col justify-between">
        {kanaGroup.characters.map((character) => {
          return <KanaRowEntry key={character.id} kana={character} />;
        })}
      </div>
    </button>
  );
};
const KanaRowEntry: React.FC<{ kana: Character }> = ({ kana }) => {
  return (
    <div className="group/entry h-16 w-16">
      <p className="group/entry-hover:hidden">{kana.kana}</p>
      <p className="group/entry-hover:inline hidden">{kana.romaji}</p>
    </div>
  );
};

const requestQuizSession = async (formData: FormData) => {
  "use server";
  if (!isAuthenticated) {
    redirect("/");
  }
  const id = getToken();

  const group = formData.get("group");

  const baseUrl = process.env.NEXT_PUBLIC_URL || "";
  const response = await fetch(`${baseUrl}/api/createQuizSession`, {
    method: "POST",
    body: JSON.stringify({ id, group }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    //TODO: Handle this
    console.log(response);
    throw new Error(
      "Something went wrong while trying to create a quiz session",
    );
  }

  redirect("/home/practice", "push" as RedirectType);
};

export default KanaTable;

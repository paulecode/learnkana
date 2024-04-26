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
    <form
      action={requestQuizSession}
      className="grid grid-rows-10 sm:grid-cols-10 sm:grid-rows-none"
    >
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
      <div className="flex h-full flex-row justify-between hover:bg-gray-900 hover:text-white hover:shadow-2xl sm:col-span-full sm:flex-col">
        {kanaGroup.characters.map((character) => {
          return <KanaRowEntry key={character.id} kana={character} />;
        })}
      </div>
    </button>
  );
};
const KanaRowEntry: React.FC<{ kana: Character }> = ({ kana }) => {
  return (
    <div className="group/entry grid h-16 w-16 place-content-center border-gray-900 transition-[background-color] ease-in-out hover:border hover:bg-white hover:text-black">
      <p className="group-hover/entry:hidden">{kana.kana}</p>
      <p className="hidden group-hover/entry:inline">{kana.romaji}</p>
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

  console.log(`Requesting quiz session of groupId ${group}`);

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

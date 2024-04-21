import { KanaGroup, Prisma } from "@prisma/client";

export default async function HiraganaPage() {
  type KanaGroupWithCharacter = Prisma.KanaGroupGetPayload<{
    include: { characters: true };
  }>;

  const groups: KanaGroupWithCharacter[] = await getHiragana();
  return (
    <div>
      <p>Hiragana</p>
      <p>Hiragana is used for...</p>
      {groups.map((group) => {
        return (
          <div key={group.id}>
            <p>{group.name}</p>
            {group.characters.map((character) => {
              return <div key={character.id}>{character.kana}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}

const getHiragana = async () => {
  const baseURL = process.env.URL || "";
  const response = await fetch(`${baseURL}/api/getKana?alphabet=1`, {
    method: "GET",
  });

  const result = await response.json();

  const { groups } = result.alphabet;

  return groups;
};

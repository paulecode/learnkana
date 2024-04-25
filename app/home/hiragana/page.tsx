import KanaTable from "@/compounds/KanaTable/KanaTable";
import { Prisma } from "@prisma/client";

export default async function HiraganaPage() {
  type KanaGroupWithCharacter = Prisma.KanaGroupGetPayload<{
    include: { characters: true };
  }>;

  const groups: KanaGroupWithCharacter[] = await getHiragana();
  return (
    <div>
      <p>Hiragana</p>
      <p>Hiragana is used for...</p>
      <KanaTable groups={groups} />
    </div>
  );
}

const getHiragana = async () => {
  const baseURL = process.env.NEXT_PUBLIC_URL || "";

  try {
    const response = await fetch(`${baseURL}/api/getKana?alphabet=HIRAGANA`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Couldn't load alphabet");
    }

    console.log("Response from Route getKana");
    const result = await response.json();

    console.log(result);
    const { groups } = result.alphabet;

    return groups;
  } catch (e) {
    console.log("Something went wrong while trying to fetch hiragana");
    console.log((e as Error).message);
    return [];
  }
};

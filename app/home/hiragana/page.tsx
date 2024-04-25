import { Button } from "@/components/ui/button";
import KanaTable from "@/compounds/KanaTable/KanaTable";
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
      <KanaTable groups={groups} />
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

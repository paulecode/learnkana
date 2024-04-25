import { Button } from "@/components/ui/button";
import KanaTable from "@/compounds/KanaTable/KanaTable";
import { ArrowLeft } from "@carbon/icons-react";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export default async function HiraganaPage() {
  type KanaGroupWithCharacter = Prisma.KanaGroupGetPayload<{
    include: { characters: true };
  }>;

  const groups: KanaGroupWithCharacter[] = await getHiragana();
  return (
    <div className="flex grow flex-col border border-blue-400">
      <Link className="flex items-center gap-2" href="/home" replace>
        <ArrowLeft />
        <p className="font-semibold">Go back</p>
      </Link>

      <div className="grow border border-red-400">
        <p className="heading-04">Hiragana</p>
        <p>Hiragana is used for...</p>
        <div className="grid place-content-center">
          <KanaTable groups={groups} />
        </div>
      </div>
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

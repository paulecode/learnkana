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
    <div className="flex grow flex-col">
      <Link className="flex items-center gap-2 p-4" href="/home" replace>
        <ArrowLeft />
        <p className="font-semibold">Go back</p>
      </Link>

      <div className="flex grow flex-col justify-around lg:flex-row">
        <div className="flex flex-col items-center gap-8 p-4 sm:items-start md:p-12 lg:px-24">
          <div className="flex w-fit flex-col gap-4 rounded-2xl from-[#efefef] to-white p-6 lg:w-auto lg:bg-gradient-to-br lg:shadow-[20px_20px_60px_#d4d4d4,_-20px_-20px_50px_#ffffff]">
            <p className="heading-04 font-semibold">Hiragana</p>
            <p className="max-w-96 text-gray-900">
              {`
Hiragana is a key script in the Japanese writing system, noted for
its cursive style. It's primarily used for native Japanese words and
grammatical elements such as verb endings and particles. This script
is essential for forming sentences and is particularly useful for
beginners learning Japanese pronunciation.
`}
            </p>
          </div>
        </div>
        <div className="grid grow place-content-center py-16">
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

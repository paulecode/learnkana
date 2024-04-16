import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const alphabets = ["HIRAGANA", "KATAKANA"]
  // const hiragana = require(`./kana/${hiragana}.json`)
  // const katakana = require(`./kana/${katakana}.json`)

  let unlockReqAlphabet = 0
  let unlockReqLetterGroup = 0

  await prisma.alphabet.deleteMany()

  for (const alphabet in alphabets) {
    const file = require(`./kana/${alphabets[alphabet].toLowerCase()}.json`)

    const prismaAlphabet = await prisma.alphabet.create({ data: { kana: alphabets[alphabet], scoreUnlockRequirement: unlockReqAlphabet } })
    console.log("Created alphabet:")
    console.log(prismaAlphabet)
    unlockReqAlphabet += 10
    for (const letterGroup in file) {
      console.log(letterGroup)
      const prismaLetterGroup = await prisma.kanaGroup.create({ data: { name: letterGroup, scoreUnlockRequirement: unlockReqLetterGroup, Alphabet: { connect: { id: prismaAlphabet.id } } } })
      console.log("Created prismaLetterGroup")
      console.log(prismaLetterGroup)
      unlockReqLetterGroup += 10
      for (let letter in file[letterGroup]) {
        const letterCreated = await prisma.character.create({ data: { kana: letter, romaji: file[letterGroup][letter], KanaGroup: { connect: { id: prismaLetterGroup.id } } } })
        console.log("Created letter")
        console.log(letterCreated)
      }
    }
  }
}

seed().then(() => {
  console.log("Seeding success")
}).catch((e) => {
  console.log(e)
}).finally(async () => {
  await prisma.$disconnect()
  console.log("Disconnected")
})

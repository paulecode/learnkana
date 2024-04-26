# Kanamanabu

![favicon](https://github.com/paulecode/learnjapanese/assets/78560094/0b469996-c7f4-4abe-b247-0a60583e27a9)

## Description

A web app for learning hiragana, katakana and in the future kanji and vocabulary, built with NextJS and Prisma with Postgres.
Hosted on [Render](https://learnjapanese.onrender.com/), persistent storage hosted on digitalocean.

### Features

Currently, you can sign up and login, as well as delete your account. With an account, you can view the kana tables for each alphabet,
with their translations. Clicking on a group takes you to a quiz (hosted on render it might take some time), where you get each letter 4 times,
2x from romaji to kana, 2x from kana to romaji. At the end of the quiz you can see your score, as well as your choices and if they are wrong and which ones would
have been correct. This quiz is available for hiragana and katakana. It is very minimal but my approach was to first build a foundation that you can extend easily
instead of trying to glue things together aimlessly. Responsive by (minimal) design, instead of adaptive.


## How to set it up

1. Git clone to a dir of your choosing
```
git clone https://github.com/paulecode/learnjapanese
```
2. Install dependencies
```
yarn
```
3. (Optional) Start a docker container with a postgres instance
```
docker run --name postgresdb -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```
4. Add `.env` variables and `env.local`
    * `.env` needs POSTGRES_URL with a connection string
    * `.env.local` needs:  
        * `POSTGRES_URL` with a connection string
        * `JWT_SECRET` (you can generate a secret by running
        `openssl rand -base64 16`)
        * `NEXT_PUBLIC_URL` this is the adress where you host it, most likely to map to `http://localhost:3000`
5. `yarn prisma migrate dev`
6. `yarn prisma db seed`
7. `yarn dev`

*OR*

5. `yarn prod:build`
6. `yarn next start`
        
Should get you started.

## Project Structure

![Slide 16_9 - 1diagran](https://github.com/paulecode/learnjapanese/assets/78560094/9d0cb35c-faa8-4bbf-9531-b0a7f01cc54d)

### Screenshots

![Screen Shot 2024-04-26 at 15 02 29](https://github.com/paulecode/learnjapanese/assets/78560094/d84e101d-8129-49f3-8371-007d41974e94)
![Screen Shot 2024-04-26 at 15 03 19](https://github.com/paulecode/learnjapanese/assets/78560094/81e2870f-5281-4f4b-a546-4a4a356af5d2)
<img width="1746" alt="Screenshot 2024-04-26 at 15 04 31" src="https://github.com/paulecode/learnjapanese/assets/78560094/d56557c9-4117-4321-b5c3-672af75abf23">
![Screen Shot 2024-04-26 at 15 05 05](https://github.com/paulecode/learnjapanese/assets/78560094/8a69304b-0afa-4393-9c22-f9deb629b6b9)
<img width="1746" alt="Screenshot 2024-04-26 at 15 06 48" src="https://github.com/paulecode/learnjapanese/assets/78560094/eece5f5a-10e0-4ec1-8b75-dedae460487e">

Mobile friendly:
![Screen Shot 2024-04-26 at 15 07 48](https://github.com/paulecode/learnjapanese/assets/78560094/89d8c57d-e0dd-4329-ab59-99ee5a22849e)
![Screen Shot 2024-04-26 at 15 05 54](https://github.com/paulecode/learnjapanese/assets/78560094/44755f09-7054-44f0-8c4e-217038ba5883)

## Known bugs/issues

* No feedback on unsuccessful login
* When starting a quiz, you will always get a toast saying "Incorrect!" despite not having chosen anything yet. This does not affect your score and is just a useEffect shenagigan

## Future plans

* Fix bug #1
* Fix bug #2
* zod validation everywhere
* type safety everywhere
* Replace shadcn components with custom scss
* Keep track of score
* Quiz multiple lettergroups
* Kanji and vocabulary quiz
* Reading and writing practice

## AI Disclaimer

No Copilot or anything was used to generate code. I used ChatGPT to generate the favicon, and the two paragraphs describing the two alphabets. I of course used ChatGPT to learn concepts or troubleshoot when stuff did not work out at all. This project is a solo project, and just for fun.

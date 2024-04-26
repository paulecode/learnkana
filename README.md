# Kanamanabu

## Description

A web app for learning hiragana, katakana and in the future kanji and vocabulary, built with NextJS and Prisma with Postgres.
Hosted on [Render](https://learnjapanese.onrender.com/), persistent storage hosted on digitalocean.

### Features

Currently, you can sign up and login, as well as delete your account. With an account, you can view the kana tables for each alphabet,
with their translations. Clicking on a group takes you to a quiz (hosted on render it might take some time), where you get each letter 4 times,
2x from romaji to kana, 2x from kana to romaji. At the end of the quiz you can see your score, as well as your choices and if they are wrong and which ones would
have been correct. This quiz is available for hiragana and katakana. It is very minimal but my approach was to first build a foundation that you can extend easily
instead of trying to glue things together aimlessly.

### Screenshots

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

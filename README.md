<p align="center">
  <img src="./.readme/e.png" width="128px">
  <br/>
  <a href="https://euler.haku.dev" align="center">Project Euler API</a>
  <p align="center">A simple API to check your answer of a Project Euler question.</p>
</p>

---

# How to use?

## Request

### Method 1

Send any type `HTTP` request to [https://euler.haku.dev/api](https://euler.haku.dev/api) or [https://projecteuler.vercel.app/api](https://projecteuler.vercel.app/api) with query parameters `q` and `a`.

`q` is the question number, and `a` is the answer, both required.

**Example:** _(question 1; answer: 123456)_

```shell
https://projecteuler.vercel.app/api?q=1&a=123456
# or
https://euler.haku.dev/api?q=1&a=123456
```

### Method 2

Send any type `HTTP` request to [https://euler.haku.dev/api/<question_number>/<answer\>](https://euler.haku.dev/api) or [https://projecteuler.vercel.app/api/<question_number>/<answer\>](https://projecteuler.vercel.app/api).

`answer` should be URL-encoded if needed. E.g., `/` in the answer.

**Example:** _(question 123; answer: 456/789)_

```shell
https://projecteuler.vercel.app/api/123/456%2F789
# or
https://euler.haku.dev/api/123/456%2F789
```

## Response

There're only 3 success responses, `1`, `0`, or `?`.

`1`: Correct

`0`: Incorrect

`?`: Answer Not Found

# Why this project?

I am too lazy, yup. I don't want to keep copying and pasting the answer to Project Euler's site, just want to pass my answer to a resquest function after the code finish running and check if I got it correct.

# Answers

## Thanks

All answers are from [luckytoilet/projecteuler-solutions] maintained by [Bai Li](https://github.com/luckytoilet).

## Updates

A GitHub Action workflow will check the solution file on [projecteuler-solutions] everyday and update the answers file on this project if there're any new answers. That means if [projecteuler-solutions] doesn't have the answer, the API will not have it, too. You will get a `?` response in such case.

## Issue

If you solved a problem but it is not on [projecteuler-solutions]. You can send a pull request to that repository, and this project will update the answer automatically in 12 hours after the pull request is merged.

If your have the correct answer submitted to Project Euler and identical to the one on [projecteuler-solutions], but the API response you a `0` after calling it correctly. Please post an issue on this repository to let me know. I will work on a update to fix the issue.

## P.S.

Although all the answers are open on [luckytoilet/projecteuler-solutions] and this project, but please do solve the problem yourself and don't lie to yourself and submit the answer to Project Euler without solving it on you own. This is merely a tool to check your answer, not solving it for you.

[luckytoilet/projecteuler-solutions]: https://github.com/luckytoilet/projecteuler-solutions
[projecteuler-solutions]: https://github.com/luckytoilet/projecteuler-solutions

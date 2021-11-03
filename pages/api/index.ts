import { NextApiRequest, NextApiResponse } from "next";
import answers from "../../data/answers.json";

const CheckAnswer = (req: NextApiRequest, res: NextApiResponse) => {
  const q = req.query?.q as string;
  const a = req.query?.a as string;

  if (!q) return res.status(400).send("Question number is required.");
  if (!a) return res.status(400).send("Answer is required.");
  if (answers[q] === undefined) return res.status(200).send("?");

  res.status(200).send(String(answers[q]) === a ? 1 : 0);
};

export default CheckAnswer;

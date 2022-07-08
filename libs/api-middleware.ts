import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import answers from '@/data/answers.json';

/**
 * Middleware of the check answer API.
 *
 * @param handler Next.js API handler
 * @returns API handler
 */
export const checkAnswerMiddleware =
  (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
    const q = req.query?.q as string;
    const a = req.query?.a as string;

    if (!q) {
      res.status(400).send('Question number is required.');
      return;
    }
    if (!a) {
      res.status(400).send('Answer is required.');
      return;
    }
    if (answers[q] === '' || answers[q] === undefined) {
      res.status(200).send(-1);
      return;
    }

    res.status(200).send(String(answers[q]) === a ? 1 : 0);

    return handler(req, res);
  };

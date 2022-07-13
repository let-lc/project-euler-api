import type { NextApiRequest, NextApiResponse } from 'next';

import axios, { Axios, AxiosError } from 'axios';

const ProjectEulerTitles = async (
  req: NextApiRequest,
  res: NextApiResponse<string>
) => {
  if (req.query?.token !== process.env.TOKEN) {
    res.status(401).send('Unauthorized: Bad token!');
    return;
  }

  try {
    const { data } = await axios.get<string>(
      'https://projecteuler.net/minimal=problems;csv'
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default ProjectEulerTitles;

import { NextApiRequest, NextApiResponse } from "next";

import { bot } from "../../funcs/bot";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const { 
    email, password,
  } = req.body;

  if (method === "POST") {
    await bot(email, password);

    return res.status(200);
  } else {
    return res.status(404);
  }
}

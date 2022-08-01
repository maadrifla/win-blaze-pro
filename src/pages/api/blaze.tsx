import { NextApiRequest, NextApiResponse } from "next";

import { login } from "../../funcs/login";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const { email, password } = req.body;

  if (method === "POST") {
    let success = await login(email, password);

    return res.status(200).send(success);
  } else {
    return res.status(404);
  }
}

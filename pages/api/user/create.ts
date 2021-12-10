import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import sha256 from "crypto-js/sha256";
import { logger } from "@lib/logger";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    await handlePOST(res, req);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

// POST /api/user
async function handlePOST(res, req) {
  logger.debug("creating user", {
    ...req.body,
    password: hashPassword(req.body.password),
  });
  const user = await prisma.user.create({
    data: { ...req.body, password: hashPassword(req.body.password) },
  });
  res.json(user);
}

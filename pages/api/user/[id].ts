import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = req.query.id;

  if (req.method === "GET") {
    handleGET(userId, res);
  } else if (req.method === "POST") {
    handlePOST(userId, res, req);
  } else if (req.method === "DELETE") {
    handleDELETE(userId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}

// GET /api/user/:id
async function handleGET(userId, res) {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    // include: { id: true, name: true, email: true, image: true },
  });
  res.json(user);
}

// GET /api/user/:id
async function handlePOST(userId, res, req) {
  const user = await prisma.user.update({
    where: { id: Number(userId) },
    data: { ...req.body },
  });
  return res.json(user);
}

// DELETE /api/user/:id
async function handleDELETE(userId, res) {
  const user = await prisma.user.delete({
    where: { id: Number(userId) },
  });
  res.json(user);
}

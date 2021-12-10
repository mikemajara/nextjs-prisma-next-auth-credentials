import { logger } from "../../lib/logger";
import { GetStaticProps } from "next";
import { signOut } from "next-auth/react";
import React from "react";

interface Props {
  callbackUrl: string;
}

export default function logout({ callbackUrl }: Props) {
  logger.debug(`callbackUrl`);
  logger.debug(callbackUrl);
  signOut({ callbackUrl });
  return <div></div>;
}

export const getStaticProps = async (context: GetStaticProps) => ({
  props: { callbackUrl: process.env.NEXTAUTH_URL }, // will be passed to the page component as props
});

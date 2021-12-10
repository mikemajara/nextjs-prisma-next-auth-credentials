import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { logger } from "@lib/logger";
import { Button, HStack } from "@chakra-ui/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  logger.debug(session);
  let left = (
    <HStack>
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
    </HStack>
  );

  let right = null;

  if (status == "loading") {
    left = (
      <div>
        <Link href="/">
          <a data-active={isActive("/")}>Feed</a>
        </Link>
      </div>
    );
    right = (
      <div>
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <HStack>
        <Button onClick={() => signIn()}>Log in</Button>
      </HStack>
    );
  }

  if (session) {
    left = (
      <HStack>
        <Link href="/">
          <a data-active={isActive("/")}>Feed</a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>My drafts</a>
        </Link>
      </HStack>
    );
    right = (
      <HStack>
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create" passHref>
          <Button>
            <a>New post</a>
          </Button>
        </Link>
        <Button
          onClick={() => {
            logger.debug("callbackUrl: ", router.basePath);
            signOut();
          }}
        >
          Log out
        </Button>
      </HStack>
    );
  }

  return (
    <nav>
      <HStack
        p={5}
        justify="space-between"
        borderBottom="1px solid"
        shadow="md"
      >
        {left}
        {right}
      </HStack>
    </nav>
  );
};

export default Header;

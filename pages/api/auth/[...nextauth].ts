import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import { logger } from "../../../lib/logger";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  debug: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const user = await fetch(
          `${process.env.NEXTAUTH_URL}/api/user/check-credentials`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
            body: Object.entries(credentials)
              .map((e) => e.join("="))
              .join("&"),
          },
        )
          .then((res) => res.json())
          .catch((err) => {
            return null;
          });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // pages
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  logger: {
    error: (code, metadata) => {
      logger.error(code, metadata);
    },
    warn: (code) => {
      logger.warn(code);
    },
    debug: (code, metadata) => {
      logger.debug(code, metadata);
    },
  },
  session: { strategy: "jwt" },
  // // callbacks
  // callbacks: {
  //   signIn: async ({
  //     user,
  //     account,
  //     profile,
  //     email,
  //     credentials,
  //   }) => {
  //     logger.debug(`signIn:user`, user, "\n\n");
  //     logger.debug(`signIn:account`, account, "\n\n");
  //     logger.debug(`signIn:profile`, profile, "\n\n");
  //     return true;
  //   },
  // redirect: async ({ url, baseUrl }): Promise<any> => {
  //   logger.debug(`url, baseUrl`, url, baseUrl);
  //   const params = new URLSearchParams(new URL(url).search);
  //   const callbackUrl = params.get("callbackUrl");
  //   if (url.startsWith(baseUrl)) {
  //     if (callbackUrl?.startsWith("/")) {
  //       logger.debug("redirecting to", baseUrl + callbackUrl);
  //       return baseUrl + callbackUrl;
  //     } else if (callbackUrl?.startsWith(baseUrl)) {
  //       logger.debug("redirecting to", callbackUrl);
  //       return callbackUrl;
  //     }
  //   } else {
  //     logger.debug("redirecting to", baseUrl);
  //     return Promise.resolve(baseUrl);
  //   }
  //   // return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl);
  // },
  //   // Getting the JWT token from API response
  //   jwt: async ({ token, user, account, profile, isNewUser }) => {
  //     logger.debug(`jwt:token`, token, "\n\n");
  //     logger.debug(`jwt:user`, user, "\n\n");
  //     logger.debug(`jwt:account`, account, "\n\n");
  //     const isSigningIn = user ? true : false;
  //     if (isSigningIn) {
  //       token.jwt = user.access_token;
  //       token.user = user;
  //     } else {
  //       logger.debug(`jwt:isSignIn: user is not logged in`, "\n\n");
  //     }
  //     logger.debug(`resolving token`, token, "\n\n");
  //     return Promise.resolve(token);
  //   },
  //   session: async ({ session, token }) => {
  //     logger.debug(`session:session`, session, "\n\n");
  //     logger.debug(`session:token`, token, "\n\n");
  //     session.jwt = token.jwt;
  //     session.user = token.user;
  //     logger.debug(`resolving session`, session, "\n\n");
  //     return Promise.resolve(session);
  //   },
  // },
  // // session
  // session: {
  //   // Choose how you want to save the user session.
  //   // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
  //   // If you use an `adapter` however, we default it to `"database"` instead.
  //   // You can still force a JWT session by explicitly defining `"jwt"`.
  //   // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  //   // which is used to look up the session in the database.
  //   strategy: "jwt",

  //   // Seconds - How long until an idle session expires and is no longer valid.
  //   maxAge: 30 * 24 * 60 * 60, // 30 days

  //   // Seconds - Throttle how frequently to write to database to extend a session.
  //   // Use it to limit write operations. Set to 0 to always update the database.
  //   // Note: This option is ignored if using JSON Web Tokens
  //   updateAge: 24 * 60 * 60, // 24 hours
  // },
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, options);
export default authHandler;

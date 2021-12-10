# NextJS - Prisma - NextAuth - Credentials & OAuth

## Introduction

NextJS starter pack with
- [Prisma](https://www.prisma.io/)
- [Chakra-UI](https://chakra-ui.com/)
- [NextAuthJS](https://next-auth.js.org/)
  - [Email (passwordless)](https://next-auth.js.org/providers/email)
  - [OAuth (Github)](https://next-auth.js.org/providers/github)
  - [Credentials (Email & Password)](https://next-auth.js.org/providers/credentials)

This is a starter kit for authentication in NextJS. It is a fork from [rest-nextjs-api-routes-auth](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes-auth), read more in the [installation instructions](installation.md)

This repo illustrates user authentication logic with NextAuth v4 combined with credentials using the default configuration and the Prisma Adapter. No [callbacks](https://next-auth.js.org/configuration/callbacks) are used or needed for the flow to work - you can use both combined.

# Install & run

install
```
git clone https://github.com/mikemajara/nextjs-prisma-next-auth-credentials
yarn install
```

copy environment and fill in with your data
```
cp .env .env.local
```

run
```
yarn dev
```

## Motiviation
Setting up credentials is generally [not recommended](https://github.com/nextauthjs/next-auth/discussions/3364) "_with your database because of the security implications most people aren't ware of._", but they are widely used and much needed for applications, specially at the start of a project. You don't want to start dealing with OAuth from the start, but need some user management.

Nextauth has ~~very~~ **too** simple instructions and barely pays attention to credentials, so I decided to set up this project to experiment with the whole auth flow. **My key takeaways are**:
- Default settings are enough to use both OAuth providers and your own credentials.
- You should be able to authorize using any given API (this project uses NextJS API to check against the same prisma DB used with an [adapter](https://next-auth.js.org/adapters/overview))
- Session JWT is needed (as opposed to database strategy)

## Gotchas

### Using Gmail as your email provider

If you are using Gmail to send e-mails for passwordless authentication, make sure you enable **Less secure app access**. Go to Google > Manage Account > Security > Less secure app access, turn it on. If you don't, google will reject your user & password accessed by `nodemailer`.
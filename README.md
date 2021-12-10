# NextJS - Prisma - NextAuth - Credentials & OAuth

## Introduction

This repo illustrates user authentication logic with NextAuth v4 combined with credentials using the default configuration and the Prisma Adapter. No [callbacks](https://next-auth.js.org/configuration/callbacks) are used or needed for the flow to work - you can use both combined.

## Motiviation
Setting up credentials is generally [not recommended](https://github.com/nextauthjs/next-auth/discussions/3364) "_with your database because of the security implications most people aren't ware of._", but they are widely used and much needed for applications, specially at the start of a project. You don't want to start dealing with OAuth from the start, but need some user management.

Nextauth has ~~very~~ **too** simple instructions and barely pays attention to credentials, so I decided to set up this project to experiment with the whole auth flow. **My key takeaways are**:
- Default settings are enough to use both OAuth providers and your own credentials.
- You should be able to authorize using any given API (this project uses NextJS API to check against the same prisma DB used with an [adapter](https://next-auth.js.org/adapters/overview))
- Session JWT is needed (as opposed to database strategy)

This repo is a fork from [rest-nextjs-api-routes-auth](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes-auth), read more in the [installation instructions](installation.md)
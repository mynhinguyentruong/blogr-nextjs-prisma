import { NextApiHandler} from "next";
import NextAuth from "next-auth";
import { PrismaAdapter} from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

const options = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET
}
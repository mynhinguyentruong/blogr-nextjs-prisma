import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

    const session = await getSession({ req })

    if (!session) {
        res.statusCode = 403;
        return { props: { drafts: [] }}
    }

    const drafts = await prisma.post.findMany({
        where: {
            author: { email: session?.user.email },
            published: false
        }
    })
    return {
        props: {
            drafts
        }
    }
}

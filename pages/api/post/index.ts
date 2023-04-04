import { NextApiHandler} from "next";
import prisma from "../../../lib/prisma";
// import { getSession } from "next-auth/react"
import {getServerSession} from "next-auth/next";
import {options} from "../auth/[...nextauth]";

const apiHandler: NextApiHandler = async (req, res) => {
    const { title, content } = req.body

    const session = await getServerSession(req, res, options)
    console.log('session in /api/post',session)
    console.log('session in /api/post',session)
    console.log('session in /api/post',session)

    const newPost = prisma.post.create({
        data: {
            title,
            content,
            author: { connect: { email: session?.user?.email }}
        }
    })
    res.json(newPost)
}

export default apiHandler

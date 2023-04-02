import { NextApiHandler} from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react"

const apiHandler: NextApiHandler = async (req, res) => {
    const { title, content } = req.body

    const session = await getSession({ req })
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

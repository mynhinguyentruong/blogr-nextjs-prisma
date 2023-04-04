import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";

type DraftsProps = {
    drafts: PostProps[]
}

const Drafts: React.FC<DraftsProps> = (props) => {

    return (
        <Layout>
            <div className="page">
                <h1>My Drafts</h1>
                <main>
                    {props.drafts?.map((post) => (
                        <div key={post.id} className="post">
                            <Post post={post} feed={null} />

                        </div>
                    ))}
                    {props.drafts.length === 0 && <p>No drafts or failed to fetch</p>}
                </main>
            </div>
            <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

    console.log(req)
    const session = await getSession({ req })

    console.log(session)

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

    console.log(drafts)

    return {
        props: {
            drafts
        }
    }
}

export default Drafts

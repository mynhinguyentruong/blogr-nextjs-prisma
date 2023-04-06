import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params)
  const post = await prisma.post.findUnique({
    where: { id: String(params?.id) },
    include: {
      author: {
        select: { name: true, email: true }
      }
    }
  })
  console.log(post)
  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Authenticating...</div>
  }

  const userHasValidSession = Boolean(session)
  const userIsTheAuthor = session.user.email === props.author.email

  async function publishPost(id: String): Promise<void> {
    await fetch(`/api/publish/${id}`, {
      method: 'PUT',

    })
    await Router.push('/')
  }

  async function deletePost(id: String) {

  }

  let title = props.title

  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && userIsTheAuthor && (<button onClick={() => publishPost(props.id)}>Publish</button>)}
        {userHasValidSession && userIsTheAuthor && (<button onClick={() => deletePost(props.id)}>Delete</button>)}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
